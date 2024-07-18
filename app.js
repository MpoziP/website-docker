const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'mydatabase',
  password: 'password',
  port: 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Endpoint to handle form submissions
app.post('/submit', async (req, res) => {
  const { data } = req.body;
  try {
    await pool.query('INSERT INTO mytable (data) VALUES ($1)', [data]);
    res.send('Data successfully stored!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error storing data.');
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
