const { test } = require('node:test');
const assert = require('node:assert');
const { convertPlaceholders } = require('../db/db');

test('convertPlaceholders - converts multiple placeholders sequentially', () => {
  const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  const expected = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)';
  assert.strictEqual(convertPlaceholders(sql), expected);
});

test('convertPlaceholders - handles queries with no placeholders', () => {
  const sql = 'SELECT * FROM archives';
  assert.strictEqual(convertPlaceholders(sql), sql);
});

test('convertPlaceholders - handles a single placeholder', () => {
  const sql = 'SELECT * FROM authors WHERE id = ?';
  const expected = 'SELECT * FROM authors WHERE id = $1';
  assert.strictEqual(convertPlaceholders(sql), expected);
});
