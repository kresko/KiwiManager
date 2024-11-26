const db = require('../db/queries');

// Will be replaced
async function redirectToCategories(req, res) {
    res.redirect(`/categories`);
}

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    res.render('categories', { categories: categories });
}

async function getCategoryByCategoryKey(req, res) {
    const categoryId = req.params.id;

    const productsByCategoryKey = await db.getProductsByCategoryKey(categoryId);
    const categoryNameQuery = await db.getCategoryNameByCategoryKey(categoryId);
    const category = categoryNameQuery[0];

    res.render('category', { category: category, productsByCategory: productsByCategoryKey });
}

module.exports = {
    redirectToCategories,
    getAllCategories,
    getCategoryByCategoryKey,
}