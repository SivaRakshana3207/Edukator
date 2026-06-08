require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// DATABASE CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,     
    password: process.env.DB_PASSWORD,      
    database: 'education_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/api/apply', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const query = 'INSERT INTO admissions (name, email) VALUES (?, ?)';
    
    db.query(query, [name, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database saving error' });
        }
        res.status(200).json({ message: 'Application saved successfully!', id: result.insertId });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});