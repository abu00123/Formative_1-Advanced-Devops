const { Pool } = require('pg');
require('dotenv').config();

let dbType = 'sqlite';
let sqliteDb;
let pgPool;

if (process.env.DATABASE_URL) {
  dbType = 'postgres';
  pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
} else {
  const sqlite3 = require('sqlite3');
  sqliteDb = new sqlite3.Database('./archives.db');
}

function convertPlaceholders(text) {
  let index = 1;
  return text.replace(/\?/g, () => `$${index++}`);
}

function query(text, params = []) {
  return new Promise((resolve, reject) => {
    if (dbType === 'postgres') {
      const pgText = convertPlaceholders(text);
      pgPool.query(pgText, params, (err, res) => {
        if (err) return reject(err);
        resolve({ rows: res.rows });
      });
    } else {
      const isSelect = text.trim().slice(0, 6).toLowerCase() === 'select';
      if (isSelect) {
        sqliteDb.all(text, params, (err, rows) => {
          if (err) return reject(err);
          resolve({ rows });
        });
      } else {
        sqliteDb.run(text, params, function (err) {
          if (err) return reject(err);
          resolve({ rows: [], lastID: this.lastID, changes: this.changes });
        });
      }
    }
  });
}

module.exports = { query, dbType, convertPlaceholders };
