const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');
const mailService = require('../services/mailService');



// Get all bookings (upcoming + past)
const getAllBookings = async (req, res) => {
  try {
    const { status, period } = req.query;
    let query = `
      SELECT b.*, et.title as event_title, et.slug as event_slug, et.duration, et.color
      FROM bookings b
      JOIN event_types et ON b.event_type_id = et.id
      WHERE et.user_id = 1
    `;
    const params = [];

    if (status) {
      params.push(status);
      query += ` AND b.status = $${params.length}`;
    }

    if (period === 'upcoming') {
      query += ` AND b.start_time > NOW() AND b.status = 'confirmed'`;
    } else if (period === 'past') {
      query += ` AND (b.start_time <= NOW() OR b.status != 'confirmed')`;
    }

    query += ' ORDER BY b.start_time ' + (period === 'past' ? 'DESC' : 'ASC');

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get booking by UID
const getBookingByUid = async (req, res) => {
  try {
    const { uid } = req.params;
    const result = await pool.query(
      `SELECT b.*, et.title as event_title, et.slug as event_slug, et.duration, et.color, et.location_type,
              u.name as host_name, u.email as host_email, u.username as host_username
       FROM bookings b
       JOIN event_types et ON b.event_type_id = et.id
       JOIN users u ON et.user_id = u.id
       WHERE b.uid = $1`,
      [uid]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create booking
const createBooking = async (req, res) => {
  const client = await pool.connect();
  try {
    const { event_type_id, booker_name, booker_email, start_time, end_time, notes, rescheduleUid } = req.body;

    if (!event_type_id || !booker_name || !booker_email || !start_time || !end_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await client.query('BEGIN');

    // If rescheduling, cancel the old booking first
    if (rescheduleUid) {
      await client.query(
        `UPDATE bookings SET status = 'cancelled', cancellation_reason = 'Rescheduled by booker', updated_at = NOW() 
         WHERE uid = $1`,
        [rescheduleUid]
      );
    }

    // Fetch current event type details including buffers
    const etCheck = await client.query('SELECT buffer_before, buffer_after FROM event_types WHERE id = $1', [event_type_id]);
    const bBefore = etCheck.rows[0].buffer_before || 0;
    const bAfter = etCheck.rows[0].buffer_after || 0;

    const newBusyStart = new Date(new Date(start_time).getTime() - (bBefore * 60 * 1000));
    const newBusyEnd = new Date(new Date(end_time).getTime() + (bAfter * 60 * 1000));

    // Check for double booking (respecting buffers of all involved events)
    const allBookings = await client.query(
      `SELECT b.id, b.start_time, b.end_time, et.buffer_before, et.buffer_after
       FROM bookings b
       JOIN event_types et ON b.event_type_id = et.id
       WHERE et.user_id = (SELECT user_id FROM event_types WHERE id = $1)
       AND b.status = 'confirmed'
       AND b.uid != $2`,
      [event_type_id, rescheduleUid || '00000000-0000-0000-0000-000000000000']
    );

    const hasConflict = allBookings.rows.some(b => {
       const bBusyStart = new Date(new Date(b.start_time).getTime() - (b.buffer_before * 60 * 1000));
       const bBusyEnd = new Date(new Date(b.end_time).getTime() + (b.buffer_after * 60 * 1000));
       return newBusyStart < bBusyEnd && newBusyEnd > bBusyStart;
    });

    if (hasConflict) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'This time slot overlaps with an existing booking or its buffer' });
    }

    const uid = uuidv4();
    const result = await client.query(
      `INSERT INTO bookings (uid, event_type_id, booker_name, booker_email, start_time, end_time, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [uid, event_type_id, booker_name, booker_email, start_time, end_time, notes || '']
    );

    // Fetch full booking details for confirmation
    const bookingFull = await client.query(
      `SELECT b.*, et.title as event_title, et.slug as event_slug, et.duration, et.color, et.location_type,
              u.name as host_name, u.email as host_email, u.username as host_username
       FROM bookings b
       JOIN event_types et ON b.event_type_id = et.id
       JOIN users u ON et.user_id = u.id
       WHERE b.id = $1`,
      [result.rows[0].id]
    );

    await client.query('COMMIT');

    // Send SMTP email notification
    mailService.sendBookingConfirmation(bookingFull.rows[0], { title: bookingFull.rows[0].event_title });

    res.status(201).json(bookingFull.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancellation_reason } = req.body;

    // Fetch booking before cancelling for email
    const bookingData = await pool.query(
      `SELECT b.*, et.title as event_title, et.location_type 
       FROM bookings b 
       JOIN event_types et ON b.event_type_id = et.id 
       WHERE b.id = $1`, [id]
    );

    const result = await pool.query(
      `UPDATE bookings SET status = 'cancelled', cancellation_reason = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [cancellation_reason || 'Cancelled by host', id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Send SMTP email notification
    if (bookingData.rows.length > 0) {
       mailService.sendBookingCancellation(bookingData.rows[0], { title: bookingData.rows[0].event_title });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Reschedule booking
const rescheduleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_time, end_time } = req.body;

    if (!start_time || !end_time) {
      return res.status(400).json({ error: 'New start_time and end_time are required' });
    }

    // Get original booking to check event_type
    const original = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
    if (original.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check for conflicts
    const conflictCheck = await pool.query(
      `SELECT id FROM bookings
       WHERE event_type_id IN (SELECT id FROM event_types WHERE user_id = (SELECT user_id FROM event_types WHERE id = $1))
       AND status = 'confirmed'
       AND id != $4
       AND start_time < $3
       AND end_time > $2`,
      [original.rows[0].event_type_id, start_time, end_time, id]
    );

    if (conflictCheck.rows.length > 0) {
      return res.status(409).json({ error: 'This time slot is already booked' });
    }

    const result = await pool.query(
      `UPDATE bookings SET start_time = $1, end_time = $2, status = 'confirmed', updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [start_time, end_time, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error rescheduling booking:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllBookings,
  getBookingByUid,
  createBooking,
  cancelBooking,
  rescheduleBooking,
};
