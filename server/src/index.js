require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db/schema');

const eventTypesRoutes = require('./routes/eventTypes');
const availabilityRoutes = require('./routes/availability');
const bookingsRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://cal-clone-eight.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/event-types', eventTypesRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/bookings', bookingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// User info (for public booking page)
app.get('/api/user/:username', async (req, res) => {
  const pool = require('./db/pool');
  try {
    const result = await pool.query(
      'SELECT id, name, username, avatar_url, timezone FROM users WHERE username = $1',
      [req.params.username]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all active event types for a user (public)
app.get('/api/user/:username/event-types', async (req, res) => {
  const pool = require('./db/pool');
  try {
    const result = await pool.query(
      `SELECT et.* FROM event_types et
       JOIN users u ON et.user_id = u.id
       WHERE u.username = $1 AND et.is_active = true
       ORDER BY et.duration ASC`,
      [req.params.username]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching public event types:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Initialize database and start server
async function start() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
