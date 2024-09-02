const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'mysql-373a9699-apparigow-8ddb.c.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_pTVEBN6L6YIdj_V4U-N',
    database: 'defaultdb',
    port: 26978
});

// Connect to the database
connection.connect();

// SQL statement to alter the column type
const alterTableQuery = `
SELECT * FROM airport WHERE city_id IS NOT NULL AND city_id NOT IN (SELECT id FROM city);
`;

// Execute the query
connection.query(alterTableQuery, (err, results) => {
  if (err) {
    console.error('Error altering table:', err);
  } else {
    console.log('Data:', results);
  }
  
  // Close the connection
  connection.end();
});
