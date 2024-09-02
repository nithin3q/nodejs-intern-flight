const { createServer } = require('http');
const app = require('./index');  // Import the Express app

const server = createServer(app);

module.exports = (req, res) => {
  server.emit('request', req, res);
};