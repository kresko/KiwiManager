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

async function getCategoryKeyByProductId(productId) {
    const { rows } = await pool.query(sql.getCategoryKeyByProductId, [productId]);

    return rows;
}

async function deleteCategory(id) {
    await pool.query(sql.dropCategoryConstraints);
    await pool.query(sql.addCategoryConstraints);
    await pool.query(sql.deleteCategory, [id]);
}

async function deleteProduct(id) {
    await pool.query(sql.deleteProduct, [id]);
}

module.exports = {
    getAllCategories,
    getProductsByCategoryKey,
    getCategoryNameByCategoryKey,
    deleteCategory,
    deleteProduct,
    getCategoryKeyByProductId
}