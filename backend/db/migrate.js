const { query, dbType } = require('./db');

async function migrate() {
  const isPg = dbType === 'postgres';
  const autoIncrement = isPg ? 'SERIAL PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
  
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id ${autoIncrement},
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL
    );
  `;
  const createAuthorsTable = `
    CREATE TABLE IF NOT EXISTS authors (
      id ${autoIncrement},
      name VARCHAR(255) NOT NULL,
      bio TEXT,
      portrait_url TEXT,
      rating REAL DEFAULT 0.0,
      reviews_count INTEGER DEFAULT 0
    );
  `;
  const createArchivesTable = `
    CREATE TABLE IF NOT EXISTS archives (
      id ${autoIncrement},
      title VARCHAR(255) NOT NULL,
      author_id INTEGER,
      category VARCHAR(100),
      century VARCHAR(50),
      cover_url TEXT,
      content TEXT,
      rating REAL DEFAULT 0.0,
      reviews_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const createRequestsTable = `
    CREATE TABLE IF NOT EXISTS requests (
      id ${autoIncrement},
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255),
      cover_url TEXT,
      rating REAL DEFAULT 0.0,
      reviews_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await query(createUsersTable);
  await query(createAuthorsTable);
  await query(createArchivesTable);
  await query(createRequestsTable);
  
  console.log('Database migrated successfully');
}

if (require.main === module) {
  migrate().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
}

module.exports = migrate;
