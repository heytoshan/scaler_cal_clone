const { Pool } = require('pg');
require('dotenv').config();

// Enable SSL if using a remote Neon/Supabase DB URL in production/external modes
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;
const isNeonDb = connectionString && connectionString.includes('neon.tech');

const pool = new Pool({
  connectionString,
  ssl: isProduction || isNeonDb ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
