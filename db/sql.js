const getAllCategoriesSql = `
    SELECT c.id_category, c.name, c.category_key, i.id_image, i.url, i.type
    FROM categories c
        INNER JOIN images i ON i.id_image = c.fk_image;
`;

const getProductsByCategoryKeySql = `
    SELECT p.id_product, p.name, p.description, p.price, p.base_price, c.name AS category_name, c.category_key, i.url
    FROM products p
        INNER JOIN categories c ON c.id_category = p.fk_category
        INNER JOIN images i ON i.id_image = p.fk_image
    WHERE c.category_key = ($1)
`;

const getCategoryNameByCategoryKeySql = `
    SELECT c.name
    FROM categories c
    WHERE c.category_key = ($1)
`;

module.exports = {
    getAllCategoriesSql,
    getProductsByCategoryKeySql,
    getCategoryNameByCategoryKeySql,
}