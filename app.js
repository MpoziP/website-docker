const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'mydatabase',
    password: 'password',
    port: 5432
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/data', async (req, res) => {
    const { data } = req.body;
    try {
        const result = await pool.query('INSERT INTO mytable (data) VALUES ($1) RETURNING *', [data]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
