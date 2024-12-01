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

const dropCategoryConstraints = `
    ALTER TABLE products DROP CONSTRAINT products_fk_category_fkey;
`;

const addCategoryConstraints = `
    ALTER TABLE products
        ADD CONSTRAINT products_fk_category_fkey
            FOREIGN KEY (fk_category) REFERENCES categories(id_category)
                ON DELETE CASCADE;
`

const deleteCategory = `
    DELETE FROM categories WHERE id_category = ($1);
`;

const deleteProduct = `
    DELETE FROM products p WHERE p.id_product = ($1);
`;

const getCategoryKeyByProductId = `
    SELECT c.category_key
    FROM categories c
        INNER JOIN products p ON p.fk_category = c.id_category
    WHERE p.id_product = ($1)
`;

module.exports = {
    getAllCategoriesSql,
    getProductsByCategoryKeySql,
    getCategoryNameByCategoryKeySql,
    dropCategoryConstraints,
    addCategoryConstraints,
    deleteCategory,
    deleteProduct,
    getCategoryKeyByProductId
}