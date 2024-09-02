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
fs.createReadStream('../data/Database.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Handle missing city_id and country_id
    const city_id = row.city_id ? row.city_id : null;
    const country_id = row.country_id ? row.country_id : null;

    // Handle empty strings for elevation_ft
    const elevation_ft = row.elevation_ft.trim() === '' ? null : row.elevation_ft;

    // Prepare data for insertion
    const dataToInsert = {
      id: row.id,
      icao_code: row.icao_code,
      iata_code: row.iata_code,
      name: row.name,
      type: row.type,
      latitude_deg: row.latitude_deg,
      longitude_deg: row.longitude_deg,
      elevation_ft: elevation_ft,
      city_id: city_id,
      country_id: country_id
    };

    connection.query('INSERT INTO airport SET ?', dataToInsert, (err, results) => {
      if (err) {
        console.error('Error inserting row:', err, 'Row data:', dataToInsert);
        return; // Continue with the next row
      }
      console.log('Inserted:', results.insertId);
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    connection.end();
  });
