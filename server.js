const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // your MySQL user
  password: '',      // your MySQL password
  database: 'hospital_management'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Example route to get patients
app.get('/patients', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Example route to add patient
app.post('/patients', (req, res) => {
  const patient = req.body;
  db.query('INSERT INTO patients SET ?', patient, (err, result) => {
    if (err) throw err;
    res.send({ message: 'Patient added', id: result.insertId });
  });
});

// Similarly, create routes for doctors, appointments, etc.

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
