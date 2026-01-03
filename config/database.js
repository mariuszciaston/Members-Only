const { Pool } = require('pg');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to PostgreSQL Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DATABASE_URL=postgresql://user:password@localhost:5432/database_name
 */ 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Initialize database schema
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                hash VARCHAR(255) NOT NULL,
                salt VARCHAR(255) NOT NULL,
                admin BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS session (
                sid VARCHAR NOT NULL COLLATE "default",
                sess JSON NOT NULL,
                expire TIMESTAMP(6) NOT NULL
            )
            WITH (OIDS=FALSE);
            
            ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
            
            CREATE INDEX IF NOT EXISTS IDX_session_expire ON session(expire);
        `);
        
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Database initialization error:', err);
    }
};

// User model functions
const User = {
    async findOne(criteria) {
        const { username } = criteria;
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },
    
    async findById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    },
    
    async create(userData) {
        const { username, hash, salt, admin = false } = userData;
        const result = await pool.query(
            'INSERT INTO users (username, hash, salt, admin) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, hash, salt, admin]
        );
        return result.rows[0];
    }
};

// Initialize database on startup
initDB();

// Expose the pool and User model
module.exports = { pool, User };
