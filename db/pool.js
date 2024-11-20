const { Pool } = require("pg");
require("dotenv").config();

const dbUrl = `${process.env.CONNECTION_STRING}`

module.exports = new Pool({
    connectionString: dbUrl,
});