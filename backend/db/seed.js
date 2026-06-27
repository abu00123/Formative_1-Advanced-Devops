const bcrypt = require('bcryptjs');
const { query } = require('./db');

async function seed() {
  await query('DELETE FROM users');
  await query('DELETE FROM authors');
  await query('DELETE FROM archives');
  await query('DELETE FROM requests');

  const hashedPassword = await bcrypt.hash('admin123', 10);
  await query(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    ['admin', hashedPassword, 'admin']
  );

  await query(
    'INSERT INTO authors (name, bio, portrait_url, rating, reviews_count) VALUES (?, ?, ?, ?, ?)',
    [
      'Alexis Kagame',
      'Monsignor Alexis Kagame was a Rwandan scholar, poet, historian and Catholic priest. He wrote extensively in Kinyarwanda and French on history, linguistics, and philosophy.',
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLsnplmk7qcuzfFctdIqDWlEo8_8CMWCtRmiekjJlJhg5ksXg_F0oEIaQ-I971fgEHnFd1ykID-kR2EJP-tk9JZUxQuMOB5URDy8FaWSdy3nKVS4qtpyLbHgrldTwlAfZOG2GsKRUVXsLk/s200/Kagame.jpg',
      4.8,
      1420
    ]
  );
  await query(
    'INSERT INTO authors (name, bio, portrait_url, rating, reviews_count) VALUES (?, ?, ?, ?, ?)',
    [
      'Louise Mushikiwabo',
      'Rwandan politician and writer, co-author of "Rwandan Ruins, Rwandan Rising", detailing the nation\'s journey and cultural heritage.',
      'https://www.francophonie.org/sites/default/files/2023-08/Portrait%20SG.jpg',
      4.5,
      512
    ]
  );
  await query(
    'INSERT INTO authors (name, bio, portrait_url, rating, reviews_count) VALUES (?, ?, ?, ?, ?)',
    [
      'Kigeli IV Rwabugiri',
      'King (Mwami) of the Kingdom of Rwanda in the late 19th century. His oral histories, military campaigns, and administrative reforms are highly documented.',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      4.9,
      850
    ]
  );

  const authorsRes = await query('SELECT id, name FROM authors');
  const authors = authorsRes.rows;
  const alexisId = authors.find(a => a.name === 'Alexis Kagame').id;
  const louiseId = authors.find(a => a.name === 'Louise Mushikiwabo').id;
  const kigeliId = authors.find(a => a.name === 'Kigeli IV Rwabugiri').id;

  await query(
    'INSERT INTO archives (title, author_id, category, century, cover_url, content, rating, reviews_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      'La Divine Pastorale',
      alexisId,
      'Poetry',
      '20th Century',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&q=80',
      'An epic poem written by Alexis Kagame reflecting traditional Rwandan cosmology and Christian theology. The work explores the creation, the role of God (Imana), and the spiritual destiny of Rwanda...',
      4.8,
      120
    ]
  );

  await query(
    'INSERT INTO archives (title, author_id, category, century, cover_url, content, rating, reviews_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      'Un Amour Rwandais',
      alexisId,
      'Traditions',
      '20th Century',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&auto=format&fit=crop&q=80',
      'This historical study examines marital traditions, family structures, and courtship practices in ancient Rwanda. It details the social conventions and cultural significance of dowry (Inkwano)...',
      4.6,
      95
    ]
  );

  await query(
    'INSERT INTO archives (title, author_id, category, century, cover_url, content, rating, reviews_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      'History of Rwanda: From Rwabugiri to the Colony',
      kigeliId,
      'History',
      '19th Century',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&auto=format&fit=crop&q=80',
      'Compiled oral narratives and court records documenting the territorial expansions and administrative centralization under Mwami Kigeli IV Rwabugiri. This book covers his military expeditions, relations with early European explorers...',
      4.9,
      310
    ]
  );

  await query(
    'INSERT INTO archives (title, author_id, category, century, cover_url, content, rating, reviews_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      'Rwandan Ruins, Rwandan Rising',
      louiseId,
      'Research',
      '21st Century',
      'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&auto=format&fit=crop&q=80',
      'An academic research paper analyzing the reconstruction of state institutions and the revival of indigenous cultural practices (like Umuganda and Gacaca) in post-conflict Rwanda. It offers deep insights into governance...',
      4.7,
      215
    ]
  );

  await query(
    'INSERT INTO requests (title, author, cover_url, rating, reviews_count) VALUES (?, ?, ?, ?, ?)',
    [
      'La Divine Pastorale',
      'Alexis Kagame',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&auto=format&fit=crop&q=80',
      4.8,
      120
    ]
  );

  await query(
    'INSERT INTO requests (title, author, cover_url, rating, reviews_count) VALUES (?, ?, ?, ?, ?)',
    [
      'History of Rwanda: From Rwabugiri to the Colony',
      'Kigeli IV Rwabugiri',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&auto=format&fit=crop&q=80',
      4.9,
      310
    ]
  );

  console.log('Database seeded successfully');
}

if (require.main === module) {
  seed().catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
}

module.exports = seed;
