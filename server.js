const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

let db = new sqlite3.Database('books.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the books database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT
      )
    `);
  }
});

app.post('/saveList', (req, res) => {
  const { books } = req.body;

  db.serialize(() => {
    db.run('DELETE FROM books', [], (err) => {
      if (err) {
        console.error('Error deleting records:', err.message);
        res.sendStatus(500);
      } else {
        const insertStmt = db.prepare('INSERT INTO books (title) VALUES (?)');
        books.forEach(book => {
          insertStmt.run(book);
        });
        insertStmt.finalize((err) => {
          if (err) {
            console.error('Error inserting records:', err.message);
            res.sendStatus(500);
          } else {
            console.log('Records inserted successfully.');
            res.sendStatus(200);
          }
        });
      }
    });
  });
});

app.get('/getAllBooks', (req, res) => {
  db.all('SELECT title FROM books', [], (err, rows) => {
    if (err) {
      console.error('Error fetching records:', err.message);
      res.sendStatus(500);
    } else {
      const books = rows.map(row => row.title);
      res.json(books);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});