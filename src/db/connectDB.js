import mysql from "mysql2";
import config from "../../config/config.js";

const pool = mysql
  .createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    port: config.dbPort
  })
  .promise();

export default pool;
