const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "api",
  password: "18330468",
});

module.exports = pool.promise();
