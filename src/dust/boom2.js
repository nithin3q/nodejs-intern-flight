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

// Path to your CSV file
const csvFilePath = '../data/City.csv';

// Function to format numbers by trimming trailing zeroes
const formatNumber = (num) => {
  let formatted = parseFloat(num).toString();
  // Remove trailing zeroes after decimal point
  if (formatted.includes('.')) {
    formatted = formatted.replace(/\.?0+$/, '');
  }
  return formatted;
};

// Read and insert data from CSV
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Prepare the SQL query to insert data
    const insertQuery = 'INSERT INTO city (id, name, country_id, is_active, lat, `long`) VALUES (?, ?, ?, ?, ?, ?)';  // Note the backticks around 'long'
    
    // Values from the CSV row
    const values = [
      row.id,
      row.name,
      row.country_id,
      row.is_active === 'TRUE', // Convert 'TRUE'/'FALSE' to boolean
      formatNumber(row.lat),
      formatNumber(row.long)
    ];

    // Execute the query
    connection.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error('Error inserting row:', err, 'Row data:', row);
      } else {
        console.log('Inserted:', results.insertId);
      }
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    connection.end();
  });
