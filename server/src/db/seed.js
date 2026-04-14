const pool = require('./pool');
const { v4: uuidv4 } = require('uuid');

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Clear existing data
    await client.query('DELETE FROM bookings');
    await client.query('DELETE FROM date_overrides');
    await client.query('DELETE FROM availability_rules');
    await client.query('DELETE FROM availability_schedules');
    await client.query('DELETE FROM event_types');
    await client.query('DELETE FROM users');

    // Reset sequences
    await client.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    await client.query("ALTER SEQUENCE event_types_id_seq RESTART WITH 1");
    await client.query("ALTER SEQUENCE availability_schedules_id_seq RESTART WITH 1");
    await client.query("ALTER SEQUENCE availability_rules_id_seq RESTART WITH 1");
    await client.query("ALTER SEQUENCE bookings_id_seq RESTART WITH 1");

    // Seed default user
    const userResult = await client.query(`
      INSERT INTO users (name, email, username, timezone, avatar_url)
      VALUES ('Toshan', 'toshan@example.com', 'toshan', 'Asia/Kolkata', NULL)
      RETURNING id
    `);
    const userId = userResult.rows[0].id;

    // Seed event types
    const eventTypes = [
      {
        title: '15 Minute Meeting',
        slug: '15min',
        description: 'A quick 15-minute catch-up call.',
        duration: 15,
        color: '#4F46E5',
        location_type: 'google_meet',
      },
      {
        title: '30 Minute Meeting',
        slug: '30min',
        description: 'A standard 30-minute meeting for discussions.',
        duration: 30,
        color: '#0EA5E9',
        location_type: 'zoom',
      },
      {
        title: '60 Minute Consultation',
        slug: '60min',
        description: 'An in-depth 60-minute consultation session.',
        duration: 60,
        color: '#10B981',
        location_type: 'google_meet',
      },
      {
        title: 'Technical Interview',
        slug: 'technical-interview',
        description: 'Technical interview for engineering candidates.',
        duration: 45,
        color: '#F59E0B',
        location_type: 'zoom',
        is_active: false,
      },
    ];

    const eventTypeIds = [];
    for (const et of eventTypes) {
      const result = await client.query(`
        INSERT INTO event_types (user_id, title, slug, description, duration, color, location_type, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
      `, [userId, et.title, et.slug, et.description, et.duration, et.color, et.location_type, et.is_active !== false]);
      eventTypeIds.push(result.rows[0].id);
    }

    // Seed availability schedule
    const scheduleResult = await client.query(`
      INSERT INTO availability_schedules (user_id, name, timezone, is_default)
      VALUES ($1, 'Working Hours', 'Asia/Kolkata', true)
      RETURNING id
    `, [userId]);
    const scheduleId = scheduleResult.rows[0].id;

    // Seed availability rules (Monday - Friday, 9 AM - 5 PM)
    for (let day = 1; day <= 5; day++) {
      await client.query(`
        INSERT INTO availability_rules (schedule_id, day_of_week, start_time, end_time, is_active)
        VALUES ($1, $2, '09:00', '17:00', true)
      `, [scheduleId, day]);
    }

    // Saturday half day
    await client.query(`
      INSERT INTO availability_rules (schedule_id, day_of_week, start_time, end_time, is_active)
      VALUES ($1, 6, '10:00', '13:00', false)
    `, [scheduleId]);

    // Sunday off
    await client.query(`
      INSERT INTO availability_rules (schedule_id, day_of_week, start_time, end_time, is_active)
      VALUES ($1, 0, '09:00', '17:00', false)
    `, [scheduleId]);

    // Seed some bookings
    const now = new Date();
    const bookings = [
      {
        event_type_id: eventTypeIds[0],
        booker_name: 'Alice Johnson',
        booker_email: 'alice@example.com',
        start_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0),
        duration: 15,
        status: 'confirmed',
        notes: 'Quick sync about the project timeline',
      },
      {
        event_type_id: eventTypeIds[1],
        booker_name: 'Bob Williams',
        booker_email: 'bob@example.com',
        start_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 0),
        duration: 30,
        status: 'confirmed',
        notes: 'Discuss the new feature requirements',
      },
      {
        event_type_id: eventTypeIds[2],
        booker_name: 'Charlie Brown',
        booker_email: 'charlie@example.com',
        start_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 11, 0),
        duration: 60,
        status: 'confirmed',
        notes: 'Full consultation on system architecture',
      },
      {
        event_type_id: eventTypeIds[1],
        booker_name: 'Diana Prince',
        booker_email: 'diana@example.com',
        start_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 15, 0),
        duration: 30,
        status: 'confirmed',
        notes: 'Follow-up from last week',
      },
      {
        event_type_id: eventTypeIds[0],
        booker_name: 'Eve Adams',
        booker_email: 'eve@example.com',
        start_time: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 9, 0),
        duration: 15,
        status: 'cancelled',
        notes: 'Had to cancel due to conflict',
        cancellation_reason: 'Schedule conflict',
      },
    ];

    for (const b of bookings) {
      const endTime = new Date(b.start_time.getTime() + b.duration * 60 * 1000);
      await client.query(`
        INSERT INTO bookings (uid, event_type_id, booker_name, booker_email, start_time, end_time, status, notes, cancellation_reason)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [uuidv4(), b.event_type_id, b.booker_name, b.booker_email, b.start_time.toISOString(), endTime.toISOString(), b.status, b.notes, b.cancellation_reason || null]);
    }

    await client.query('COMMIT');
    console.log('✅ Database seeded successfully');
    console.log(`   - 1 user created`);
    console.log(`   - ${eventTypes.length} event types created`);
    console.log(`   - 1 availability schedule with weekly rules created`);
    console.log(`   - ${bookings.length} sample bookings created`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding database:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(console.error);
