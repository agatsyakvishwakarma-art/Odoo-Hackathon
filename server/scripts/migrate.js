require('dotenv').config();

const fs = require('fs');
const path = require('path');
const pool = require('../db');

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Copy .env.example to .env and fill in values.');
    process.exit(1);
  }

  const sqlPath = path.join(__dirname, '..', 'migrations', '001_schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log('Migration 001_schema applied successfully.');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
