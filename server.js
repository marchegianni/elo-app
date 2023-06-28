const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Cechomor0-0',
    database: 'elo_app',
    connectionLimit: 10 // Adjust the limit based on your requirements
  });

// Get a connection from the pool
const connection = pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Define the API endpoint
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users'; // Modify the query to match your table structure
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

// Define the API endpoint to save game results
app.post('/api/game-results', (req, res) => {
  const { winner1, winner2, loser1, loser2, elo_change } = req.body;
  /*const difference = (loser1.elo + loser2.elo) - (winner1.elo + winner2.elo);
  const ratio = difference / 400;
  const expected_result = 1 / (Math.pow(10, ratio));
  const K_factor = 16;
  const elo_change = Math.round(K_factor*(1 - expected_result) - 1);
  console.log(elo_change);*/

  const query = 'INSERT INTO game_results (`winner1`, `winner2`, `loser1`, `loser2`, `elo_change`) VALUES (?, ?, ?, ?, ?)';
  const values = [winner1, winner2, loser1, loser2, elo_change];

  pool.query(query, values, (error, results) => {
    if (error) {
    console.error('Error saving game result:', error);
    res.status(500).json({ error: 'Internal server error' });
    } else {
    res.json({ message: 'Game result saved successfully' });
    }
  });

  const query2 = 'UPDATE users SET elo=elo+? WHERE id IN (?, ?)';
  const values2 = [elo_change, winner1, winner2];

  pool.query(query2, values2, (error, results) => {
    if (error) {
        console.error('Error updating elo:', error);
        res.status(500).json({ error: 'Internal server error' });
        } else {
        res.json({ message: 'Elo updated successfully' });
        }
  })
});
  

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = pool;