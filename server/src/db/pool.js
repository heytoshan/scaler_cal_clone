const { Pool } = require('pg');
require('dotenv').config();

// Enable SSL if using a remote Neon/Supabase DB URL in production/external modes
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL || '';
const requiresSsl = isProduction || connectionString.includes('neon.tech') || connectionString.includes('supabase');

const pool = new Pool({
  connectionString,
  ssl: requiresSsl ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
