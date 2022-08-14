const mysql = require("mysql");
require("dotenv").config();

// Connection Pool
// prettier-ignore
const pool = mysql.createPool({
  connectionLimit : 100,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_NAME,
});

module.exports = pool;
