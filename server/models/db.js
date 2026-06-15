const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      company VARCHAR(100) NOT NULL,
      role VARCHAR(100) NOT NULL,
      status VARCHAR(50) DEFAULT 'Applied',
      applied_date DATE,
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log("DB initialized");
};

initDB();
module.exports = pool;
