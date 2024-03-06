const Pool = require("pg").Pool

const dotenv = require("dotenv");
dotenv.config({});

const DB_NAME = process.env.DB_NAME || 'acompanhalimpeza';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_PORT = process.env.DB_PORT || 5432;

const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
})

module.exports = pool
