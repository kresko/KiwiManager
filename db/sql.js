const getAllCategoriesSql = `
    SELECT c.id_category, c.name, i.id_image, i.url, i.type
    FROM categories c
        INNER JOIN images i ON i.id_image = c.fk_image;
`;

module.exports = {
    getAllCategoriesSql,
}