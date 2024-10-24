const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your MySQL username
    password: 'Achidtill_2005',  // Replace with your MySQL password
    database: 'admissions'  // Your MySQL database name
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// POST route to handle form submission
app.post('/submit-form', (req, res) => {
    const {
        date, admission_number, name, class: classNumber, academic_year, date_of_birth, aadhar_number, 
        place_of_birth, state, nationality, religion, gender, caste, address, pincode, 
        mother_tongue, blood_group, identification_marks
    } = req.body;

    const sql = `INSERT INTO admission_form (date, admission_number, name, class, academic_year, 
                 date_of_birth, aadhar_number, place_of_birth, state, nationality, religion, 
                 gender, caste, address, pincode, mother_tongue, blood_group, identification_marks) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        date, admission_number, name, classNumber, academic_year, date_of_birth, aadhar_number, 
        place_of_birth, state, nationality, religion, gender, caste, address, pincode, 
        mother_tongue, blood_group, identification_marks
    ];

    db.query(sql, values, (err) => {
        if (err) throw err;
        res.send('Form data inserted successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

