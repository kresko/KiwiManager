const pool = require('./pool');
const sql = require('./sql');

async function getAllCategories() {
    const { rows } = await pool.query(sql.getAllCategoriesSql);

    return rows;
}

async function getProductsByCategoryKey(categoryKey) {
    const { rows } = await pool.query(sql.getProductsByCategoryKeySql, [categoryKey]);

    return rows;
}

async function getCategoryNameByCategoryKey(categoryKey) {
    const { rows } = await pool.query(sql.getCategoryNameByCategoryKeySql, [categoryKey]);

    return rows;
}

module.exports = {
    getAllCategories,
    getProductsByCategoryKey,
    getCategoryNameByCategoryKey
}