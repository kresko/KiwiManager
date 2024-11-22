const db = require('../db/queries');

// Will be replaced
async function redirectToCategories(req, res) {
    res.redirect(`/categories`);
}

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    res.render('categories', { categories: categories });
}

module.exports = {
    redirectToCategories,
    getAllCategories,
}