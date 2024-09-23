import mysql from "mysql2";
import config from "../../config/config.js";

const pool = mysql
  .createPool({
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDB,
  })
  .promise();

export default pool;
