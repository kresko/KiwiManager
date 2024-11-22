const pool = require('./pool');
const sql = require('./sql');

async function getAllCategories() {
    const { rows } = await pool.query(sql.getAllCategoriesSql);

    return rows;
}

module.exports = {
    getAllCategories,
}