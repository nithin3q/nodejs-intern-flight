require("reflect-metadata");
const express = require("express");
const { createConnection } = require("typeorm");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Connect to the database and start the server
createConnection()
  .then(() => {
    console.log("Connected to MySQL database");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
