const mysql = require('mysql2');
const fs = require('fs');
const csv = require('csv-parser');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'mysql-373a9699-apparigow-8ddb.c.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_pTVEBN6L6YIdj_V4U-N',
  database: 'defaultdb',
  port: 26978
});

connection.connect();

// Correct path to your CSV file
fs.createReadStream('../data/Country.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Map the row data to match your table structure
    const data = {
      id: row.id,
      name: row.name.trim(),
      country_code_two: row.country_code_two.trim(),
      country_code_three: row.country_code_three.trim(),
      mobile_code: parseInt(row.mobile_code.trim()), // Convert to integer
      continent_id: parseInt(row.continent_id.trim()),

    };

    // Insert data into the country table
    connection.query('INSERT INTO country SET ?', data, (err, results) => {
      if (err) {
        console.error('Error inserting row:', err, 'Row data:', data);
        return; // Continue with the next row
      }
      console.log('Inserted:', results.insertId);
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    connection.end();
  });
