/* eslint-disable prettier/prettier */
const mysql = require('mysql2/promise');

const poolDb = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

module.exports = poolDb