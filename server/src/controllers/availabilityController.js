const pool = require('../db/pool');

// Get all schedules with rules
const getSchedules = async (req, res) => {
  try {
    const schedules = await pool.query(
      'SELECT * FROM availability_schedules WHERE user_id = 1 ORDER BY is_default DESC, created_at ASC'
    );

    const result = [];
    for (const schedule of schedules.rows) {
      const rules = await pool.query(
        'SELECT * FROM availability_rules WHERE schedule_id = $1 ORDER BY day_of_week ASC',
        [schedule.id]
      );
      const overrides = await pool.query(
        'SELECT * FROM date_overrides WHERE schedule_id = $1 ORDER BY specific_date ASC',
        [schedule.id]
      );
      result.push({
        ...schedule,
        rules: rules.rows,
        overrides: overrides.rows,
      });
    }

    res.json(result);
  } catch (err) {
    console.error('Error fetching schedules:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update schedule (name, timezone)
const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, timezone } = req.body;

    const result = await pool.query(
      `UPDATE availability_schedules SET
        name = COALESCE($1, name),
        timezone = COALESCE($2, timezone),
        updated_at = NOW()
       WHERE id = $3 AND user_id = 1
       RETURNING *`,
      [name, timezone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating schedule:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update availability rules for a schedule
const updateRules = async (req, res) => {
  try {
    const { id } = req.params;
    const { rules } = req.body;

    if (!rules || !Array.isArray(rules)) {
      return res.status(400).json({ error: 'Rules array is required' });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Delete existing rules
      await client.query('DELETE FROM availability_rules WHERE schedule_id = $1', [id]);

      // Insert new rules
      for (const rule of rules) {
        await client.query(
          `INSERT INTO availability_rules (schedule_id, day_of_week, start_time, end_time, is_active)
           VALUES ($1, $2, $3, $4, $5)`,
          [id, rule.day_of_week, rule.start_time, rule.end_time, rule.is_active !== false]
        );
      }

      await client.query('COMMIT');

      // Fetch updated rules
      const result = await client.query(
        'SELECT * FROM availability_rules WHERE schedule_id = $1 ORDER BY day_of_week ASC',
        [id]
      );

      res.json(result.rows);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error updating rules:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get available time slots for a given date & event type (PUBLIC)
const getAvailableSlots = async (req, res) => {
  try {
    const { date, eventTypeSlug } = req.query;

    if (!date || !eventTypeSlug) {
      return res.status(400).json({ error: 'Date and eventTypeSlug are required' });
    }

    // Get event type
    const etResult = await pool.query(
      `SELECT et.*, u.timezone as user_timezone
       FROM event_types et
       JOIN users u ON et.user_id = u.id
       WHERE et.slug = $1 AND et.is_active = true`,
      [eventTypeSlug]
    );

    if (etResult.rows.length === 0) {
      return res.status(404).json({ error: 'Event type not found' });
    }

    const eventType = etResult.rows[0];
    const duration = eventType.duration;
    const bufferBefore = eventType.buffer_before || 0;
    const bufferAfter = eventType.buffer_after || 0;

    // Get default schedule
    const schedResult = await pool.query(
      'SELECT * FROM availability_schedules WHERE user_id = $1 AND is_default = true LIMIT 1',
      [eventType.user_id]
    );

    if (schedResult.rows.length === 0) {
      return res.json({ slots: [], date });
    }

    const schedule = schedResult.rows[0];

    // Check for date overrides
    const overrideResult = await pool.query(
      'SELECT * FROM date_overrides WHERE schedule_id = $1 AND specific_date = $2',
      [schedule.id, date]
    );

    const targetDate = new Date(date + 'T00:00:00');
    const dayOfWeek = targetDate.getDay();

    let timeRanges = [];

    if (overrideResult.rows.length > 0) {
      const override = overrideResult.rows[0];
      if (override.is_blocked) {
        return res.json({ slots: [], date });
      }
      if (override.start_time && override.end_time) {
        timeRanges.push({ start: override.start_time, end: override.end_time });
      }
    } else {
      // Get rules for this day
      const rulesResult = await pool.query(
        'SELECT * FROM availability_rules WHERE schedule_id = $1 AND day_of_week = $2 AND is_active = true',
        [schedule.id, dayOfWeek]
      );
      timeRanges = rulesResult.rows.map(r => ({ start: r.start_time, end: r.end_time }));
    }

    if (timeRanges.length === 0) {
      return res.json({ slots: [], date });
    }

    // Get existing bookings for this date along with their event type buffers
    const bookingsResult = await pool.query(
      `SELECT b.start_time, b.end_time, et.buffer_before, et.buffer_after
       FROM bookings b
       JOIN event_types et ON b.event_type_id = et.id
       WHERE et.user_id = $1
       AND b.start_time::date = $2
       AND b.status = 'confirmed'`,
      [eventType.user_id, date]
    );

    const existingBookings = bookingsResult.rows.map(b => ({
      start: new Date(b.start_time),
      end: new Date(b.end_time),
      bufferBefore: b.buffer_before || 0,
      bufferAfter: b.buffer_after || 0
    }));

    // Generate time slots
    const slots = [];
    const slotDuration = duration + bufferBefore + bufferAfter;
    const now = new Date();

    for (const range of timeRanges) {
      const [startH, startM] = range.start.split(':').map(Number);
      const [endH, endM] = range.end.split(':').map(Number);

      let currentMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      while (currentMinutes + duration <= endMinutes) {
        const slotStart = new Date(targetDate);
        slotStart.setHours(Math.floor(currentMinutes / 60), currentMinutes % 60, 0, 0);

        const actualStart = new Date(slotStart.getTime() + bufferBefore * 60 * 1000);
        const slotEnd = new Date(actualStart.getTime() + duration * 60 * 1000);

        // Check if slot is in the past
        if (slotStart > now) {
          // Check for conflicts with existing bookings (including their buffers)
          const hasConflict = existingBookings.some(booking => {
            // Existing busy window
            const bBusyStart = new Date(booking.start.getTime() - (booking.bufferBefore * 60 * 1000));
            const bBusyEnd = new Date(booking.end.getTime() + (booking.bufferAfter * 60 * 1000));
            
            // Prospective busy window
            const sBusyStart = slotStart; // slotStart is already actualStart - bufferBefore
            const sBusyEnd = new Date(slotEnd.getTime() + (bufferAfter * 60 * 1000));

            return sBusyStart < bBusyEnd && sBusyEnd > bBusyStart;
          });

          if (!hasConflict) {
            slots.push({
              time: `${String(Math.floor(currentMinutes / 60)).padStart(2, '0')}:${String(currentMinutes % 60).padStart(2, '0')}`,
              startTime: actualStart.toISOString(),
              endTime: slotEnd.toISOString(),
            });
          }
        }

        currentMinutes += 15; // 15-minute intervals
      }
    }

    res.json({ slots, date, timezone: schedule.timezone });
  } catch (err) {
    console.error('Error fetching available slots:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add date override
const addDateOverride = async (req, res) => {
  try {
    const { schedule_id, specific_date, start_time, end_time, is_blocked } = req.body;

    // Delete existing override for this date
    await pool.query(
      'DELETE FROM date_overrides WHERE schedule_id = $1 AND specific_date = $2',
      [schedule_id, specific_date]
    );

    const result = await pool.query(
      `INSERT INTO date_overrides (schedule_id, specific_date, start_time, end_time, is_blocked)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [schedule_id, specific_date, is_blocked ? null : start_time, is_blocked ? null : end_time, is_blocked || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding date override:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete date override
const deleteDateOverride = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM date_overrides WHERE id = $1', [id]);
    res.json({ message: 'Date override deleted' });
  } catch (err) {
    console.error('Error deleting date override:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new schedule
const createSchedule = async (req, res) => {
  try {
    const { name, timezone } = req.body;
    
    const result = await pool.query(
      `INSERT INTO availability_schedules (user_id, name, timezone, is_default)
       VALUES (1, $1, $2, false)
       RETURNING *`,
      [name || 'New Schedule', timezone || 'Asia/Kolkata']
    );

    const schedule = result.rows[0];
    
    // Seed with default rules (Mon-Fri, 9-5)
    for (let i = 1; i <= 5; i++) {
        await pool.query(
            `INSERT INTO availability_rules (schedule_id, day_of_week, start_time, end_time, is_active)
             VALUES ($1, $2, '09:00', '17:00', true)`,
            [schedule.id, i]
        );
    }

    res.status(201).json(schedule);
  } catch (err) {
    console.error('Error creating schedule:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getSchedules,
  createSchedule,
  updateSchedule,
  updateRules,
  getAvailableSlots,
  addDateOverride,
  deleteDateOverride,
};
