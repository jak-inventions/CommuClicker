const { Pool } = require('pg');

const db = new Pool(process.env.NODE_ENV === 'production' ? {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
} : {
    user: 'postgres',
    host: 'localhost',
    database: 'comclicker',
    password: '',
    port: 5432,
});

module.exports = db;