const db = require('../db/queries');

async function deleteProduct(req, res) {
    const productId = req.params.id;
    const categoryKeyQuery = await db.getCategoryKeyByProductId(productId);
    const categoryKey = categoryKeyQuery[0].category_key;

    await db.deleteProduct(productId);

    res.redirect(`/categories/${categoryKey}`);
}

module.exports = {
    deleteProduct,
}