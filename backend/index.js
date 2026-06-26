const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('./db/db');
const { authenticateToken, requireAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Rwandan Archives API' });
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const result = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'rwandan_archives_jwt_secret_key_2026',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/authors', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM authors ORDER BY rating DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/archives', async (req, res) => {
  try {
    const { search, category, century, author_id } = req.query;
    let sql = `
      SELECT archives.*, authors.name as author_name, authors.portrait_url as author_portrait
      FROM archives
      LEFT JOIN authors ON archives.author_id = authors.id
      WHERE 1=1
    `;
    const params = [];

    if (author_id) {
      sql += ' AND archives.author_id = ?';
      params.push(author_id);
    }
    if (category && category !== 'All') {
      sql += ' AND archives.category = ?';
      params.push(category);
    }
    if (century && century !== 'All') {
      sql += ' AND archives.century = ?';
      params.push(century);
    }
    if (search) {
      sql += ' AND (archives.title LIKE ? OR authors.name LIKE ? OR archives.content LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    sql += ' ORDER BY archives.id DESC';
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/archives/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT archives.*, authors.name as author_name, authors.bio as author_bio, authors.portrait_url as author_portrait
       FROM archives
       LEFT JOIN authors ON archives.author_id = authors.id
       WHERE archives.id = ?`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Archive not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/requests', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM requests ORDER BY id DESC LIMIT 5');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/requests', async (req, res) => {
  try {
    const { title, author, cover_url, rating, reviews_count } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }
    await db.query(
      'INSERT INTO requests (title, author, cover_url, rating, reviews_count) VALUES (?, ?, ?, ?, ?)',
      [title, author, cover_url || '', rating || 0.0, reviews_count || 0]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
