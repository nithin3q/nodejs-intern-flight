const express = require('express');
const mysql = require('mysql2');

// Create an Express application
const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'mysql-373a9699-apparigow-8ddb.c.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_pTVEBN6L6YIdj_V4U-N',
    database: 'defaultdb',
    port: 26978
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Define a route to display the data
app.get('/', (req, res) => {
    // SQL query to fetch data from the city table
    const fetchQuery = 'SELECT * FROM city';

    connection.query(fetchQuery, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data from the database.');
            return;
        }

        // Generate HTML table with the data
        let html = '<h1>City Data</h1>';
        html += '<table border="1" cellpadding="5" cellspacing="0">';
        html += `
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country ID</th>
                <th>Is Active</th>
                <th>Latitude</th>
                <th>Longitude</th>
            </tr>
        `;

        results.forEach(row => {
            html += `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                    <td>${row.country_id}</td>
                    <td>${row.is_active ? 'Yes' : 'No'}</td>
                    <td>${row.lat}</td>
                    <td>${row.long}</td>
                </tr>
            `;
        });

        html += '</table>';

        // Send the HTML response
        res.send(html);
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
