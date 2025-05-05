const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;

// Basic health check endpoint
app.get('/', (req, res) => {
  res.send('Hello from Node.js Microservice!');
});

// Example API route
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', service: 'Node.js Microservice', timestamp: new Date() });
});

// Start the server
app.listen(port, () => {
  console.log(`Microservice is running on http://localhost:${port}`);
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});
