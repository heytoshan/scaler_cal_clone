const { Client } = require('pg');

async function createDatabase() {
  const client = new Client({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/postgres'
  });

  try {
    await client.connect();
    // Check if database exists
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = 'calclone'`);
    if (res.rowCount === 0) {
      await client.query('CREATE DATABASE calclone');
      console.log('Database calclone created successfully.');
    } else {
      console.log('Database calclone already exists.');
    }
  } catch (err) {
    console.error('Error creating database:', err.message);
  } finally {
    await client.end();
  }
}

createDatabase();
