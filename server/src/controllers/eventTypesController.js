const pool = require('../db/pool');

// Get all event types
const getAllEventTypes = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM event_types WHERE user_id = 1 ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching event types:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get event type by slug (public)
const getEventTypeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      `SELECT et.*, u.name as user_name, u.username, u.avatar_url, u.timezone as user_timezone
       FROM event_types et
       JOIN users u ON et.user_id = u.id
       WHERE et.slug = $1 AND et.is_active = true`,
      [slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event type not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching event type:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get event type by ID
const getEventTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM event_types WHERE id = $1 AND user_id = 1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event type not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching event type:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create event type
const createEventType = async (req, res) => {
  try {
    const { title, slug, description, duration, color, location_type, buffer_before, buffer_after } = req.body;

    if (!title || !slug || !duration) {
      return res.status(400).json({ error: 'Title, slug, and duration are required' });
    }

    // Check slug uniqueness
    const slugCheck = await pool.query(
      'SELECT id FROM event_types WHERE slug = $1 AND user_id = 1',
      [slug]
    );
    if (slugCheck.rows.length > 0) {
      return res.status(409).json({ error: 'An event type with this URL slug already exists' });
    }

    const result = await pool.query(
      `INSERT INTO event_types (user_id, title, slug, description, duration, color, location_type, buffer_before, buffer_after)
       VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, slug, description || '', duration, color || '#292929', location_type || 'google_meet', buffer_before || 0, buffer_after || 0]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating event type:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update event type
const updateEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, description, duration, color, location_type, is_active, buffer_before, buffer_after } = req.body;

    // Check if slug is being changed and is unique
    if (slug) {
      const slugCheck = await pool.query(
        'SELECT id FROM event_types WHERE slug = $1 AND user_id = 1 AND id != $2',
        [slug, id]
      );
      if (slugCheck.rows.length > 0) {
        return res.status(409).json({ error: 'An event type with this URL slug already exists' });
      }
    }

    const result = await pool.query(
      `UPDATE event_types SET
        title = COALESCE($1, title),
        slug = COALESCE($2, slug),
        description = COALESCE($3, description),
        duration = COALESCE($4, duration),
        color = COALESCE($5, color),
        location_type = COALESCE($6, location_type),
        is_active = COALESCE($7, is_active),
        buffer_before = COALESCE($8, buffer_before),
        buffer_after = COALESCE($9, buffer_after),
        updated_at = NOW()
       WHERE id = $10 AND user_id = 1
       RETURNING *`,
      [title, slug, description, duration, color, location_type, is_active, buffer_before, buffer_after, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event type not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating event type:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete event type
const deleteEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM event_types WHERE id = $1 AND user_id = 1 RETURNING id',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event type not found' });
    }
    res.json({ message: 'Event type deleted successfully' });
  } catch (err) {
    console.error('Error deleting event type:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Toggle event type active status
const toggleEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE event_types SET is_active = NOT is_active, updated_at = NOW()
       WHERE id = $1 AND user_id = 1
       RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event type not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error toggling event type:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllEventTypes,
  getEventTypeBySlug,
  getEventTypeById,
  createEventType,
  updateEventType,
  deleteEventType,
  toggleEventType,
};
