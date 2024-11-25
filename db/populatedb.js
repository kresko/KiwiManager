#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `

    DROP TABLE products;
    DROP TABLE categories;
    DROP TABLE images;

    CREATE TABLE IF NOT EXISTS images (
        id_image INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        filename VARCHAR(255),
        url VARCHAR(255),
        type VARCHAR(20),
        created_at DATE DEFAULT CURRENT_DATE,
        updated_at DATE DEFAULT CURRENT_DATE
    );

    CREATE TABLE IF NOT EXISTS categories (
        id_category INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR( 50 ),
        category_key VARCHAR( 50 ),
        fk_image INT,
        FOREIGN KEY (fk_image) REFERENCES images(id_image),
        created_at DATE DEFAULT CURRENT_DATE,
        updated_at DATE DEFAULT CURRENT_DATE
    );

    CREATE TABLE IF NOT EXISTS products (
        id_product INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR( 50 ),
        description VARCHAR( 255 ),
        price FLOAT,
        base_price FLOAT,
        fk_image INT,
        FOREIGN KEY (fk_image) REFERENCES images(id_image),
        fk_category INT,
        FOREIGN KEY (fk_category) REFERENCES categories(id_category),
        created_at DATE DEFAULT CURRENT_DATE,
        updated_at DATE DEFAULT CURRENT_DATE
    );

    -- Full images import--
    INSERT INTO images (filename, url, type, created_at, updated_at)
    VALUES
        -- categories
        ('bakery.jpg', '/images/categories/bakery.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('beverages.jpg', '/images/categories/beverages.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('cleaning-products.jpg', '/images/categories/cleaning-products.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('dairy.jpg', '/images/categories/dairy.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('fruits.jpg', '/images/categories/fruits.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('meat.jpg', '/images/categories/meat.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('personal-care.jpg', '/images/categories/personal-care.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('snacks.jpg', '/images/categories/snacks.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('vegetables.jpg', '/images/categories/vegetables.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        -- products
        -- bakery --
        ('bread.jpg', '/images/products/bread.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('croissant.jpg', '/images/products/croissant.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('bagel.jpg', '/images/products/bagel.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('muffin.jpg', '/images/products/muffin.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('cake.jpg', '/images/products/cake.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        -- beverages --
        ('coffee.jpg', '/images/products/coffee.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('tea.jpg', '/images/products/tea.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('juice.jpg', '/images/products/juice.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('water.jpg', '/images/products/water.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('soda.jpg', '/images/products/soda.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        -- cleaning products --
        ('soap.jpg', '/images/products/soap.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('detergent.jpg', '/images/products/detergent.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('bleach.jpg', '/images/products/bleach.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('glass-cleaner.jpg', '/images/products/glass-cleaner.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('sponge.jpg', '/images/products/sponge.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        -- dairy --
        ('milk.jpg', '/images/products/milk.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('cheese.jpg', '/images/products/cheese.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('butter.jpg', '/images/products/butter.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('yogurt.jpg', '/images/products/yogurt.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('cream.jpg', '/images/products/cream.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        -- fruits --
        ('apple.jpg', '/images/products/apple.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('banana.jpg', '/images/products/banana.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('orange.jpg', '/images/products/orange.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('grape.jpg', '/images/products/grape.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('mango.jpg', '/images/products/mango.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        -- meat --
        ('chicken.jpg', '/images/products/chicken.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('beef.jpg', '/images/products/beef.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('pork.jpg', '/images/products/pork.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('lamb.jpg', '/images/products/lamb.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('turkey.jpg', '/images/products/turkey.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        -- personal care --
        ('shampoo.jpg', '/images/products/shampoo.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('conditioner.jpg', '/images/products/conditioner.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('toothpaste.jpg', '/images/products/toothpaste.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('body-wash.jpg', '/images/products/body-wash.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('deodorant.jpg', '/images/products/deodorant.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        -- snacks --
        ('chips.jpg', '/images/products/chips.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('chocolate.jpg', '/images/products/chocolate.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('popcorn.jpg', '/images/products/popcorn.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('candy.jpg', '/images/products/candy.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('nuts.jpg', '/images/products/nuts.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        -- vegetables --
        ('carrot.jpg', '/images/products/carrot.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('broccoli.jpg', '/images/products/broccoli.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('potato.jpg', '/images/products/potato.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('spinach.jpg', '/images/products/spinach.jpg', 'product', CURRENT_DATE, CURRENT_DATE),
        ('onion.jpg', '/images/products/onion.jpg', 'product', CURRENT_DATE, CURRENT_DATE);


    -- Target Image import --
    INSERT INTO images (filename, url, type, created_at, updated_at)
    VALUES
        ('apple.jpg', '/images/products/apple.jpg', 'category', CURRENT_DATE, CURRENT_DATE);

    -- Full categories import --
    INSERT INTO categories (name, category_key, fk_image)
    VALUES
        ('Bakery', 'bakery', 1),
        ('Beverages', 'beverages', 2),
        ('Cleaning Products', 'cleaning-products', 3),
        ('Dairy', 'dairy', 4),
        ('Fruits', 'fruits', 5),
        ('Meat', 'meat', 6),
        ('Personal Care', 'personal-care', 7),
        ('Snacks', 'snacks', 8),
        ('Vegetables', 'vegetables', 9);

    -- Full products import --
    INSERT INTO products (name, description, price, base_price, fk_image, fk_category)
    VALUES
        -- bakery --
        ('Bread', 'Freshly baked bread.', 2.00, 1.80, 10, 1),
        ('Croissant', 'Buttery croissants.', 1.50, 1.30, 11, 1),
        ('Bagel', 'New York-style bagels.', 1.20, 1.00, 12, 1),
        ('Muffin', 'Chocolate chip muffins.', 1.80, 1.50, 13, 1),
        ('Cake', 'Delicious sponge cake.', 5.00, 4.50, 14, 1),
        -- beverages --
        ('Coffee', 'Ground coffee beans.', 4.00, 3.50, 15, 2),
        ('Tea', 'Organic green tea.', 3.00, 2.50, 16, 2),
        ('Juice', 'Fresh orange juice.', 2.00, 1.80, 17, 2),
        ('Water', 'Mineral water.', 0.80, 0.70, 18, 2),
        ('Soda', 'Sparkling soda.', 1.00, 0.90, 19, 2),
        -- cleaning Products --
        ('Soap', 'Liquid hand soap.', 1.50, 1.20, 20, 3),
        ('Detergent', 'Laundry detergent.', 5.00, 4.50, 21, 3),
        ('Bleach', 'Household bleach.', 2.00, 1.80, 22, 3),
        ('Glass Cleaner', 'Streak-free glass cleaner.', 3.00, 2.50, 23, 3),
        ('Sponge', 'Cleaning sponges.', 1.00, 0.80, 24, 3),
        -- dairy --
        ('Milk', '1L of fresh milk.', 1.00, 0.90, 25, 4),
        ('Cheese', 'Cheddar cheese.', 2.50, 2.20, 26, 4),
        ('Butter', 'Creamy butter.', 1.80, 1.50, 27, 4),
        ('Yogurt', 'Natural yogurt.', 1.20, 1.00, 28, 4),
        ('Cream', 'Rich whipping cream.', 1.50, 1.30, 29, 4),
        -- fruits --
        ('Apple', 'A fresh, crisp apple.', 1.00, 0.80, 30, 5),
        ('Banana', 'A ripe, sweet banana.', 0.50, 0.30, 31, 5),
        ('Orange', 'A juicy, tangy orange.', 0.80, 0.60, 32, 5),
        ('Grape', 'A bunch of sweet, seedless grapes.', 2.00, 1.80, 33, 5),
        ('Mango', 'A tropical, juicy mango.', 1.50, 1.20, 34, 5),
        -- meat --
        ('Chicken', 'Free-range chicken.', 5.00, 4.50, 35, 6),
        ('Beef', 'Grass-fed beef.', 10.00, 9.00, 36, 6),
        ('Pork', 'Tender pork chops.', 8.00, 7.50, 37, 6),
        ('Lamb', 'Fresh lamb meat.', 12.00, 11.00, 38, 6),
        ('Turkey', 'Whole turkey.', 15.00, 14.00, 39, 6),
        -- personal care --
        ('Shampoo', 'Herbal shampoo.', 3.50, 3.00, 40, 7),
        ('Conditioner', 'Hair conditioner.', 3.50, 3.00, 41, 7),
        ('Toothpaste', 'Fluoride toothpaste.', 2.00, 1.80, 42, 7),
        ('Body Wash', 'Moisturizing body wash.', 4.00, 3.50, 43, 7),
        ('Deodorant', 'Antiperspirant deodorant.', 3.00, 2.50, 44, 7),
        -- snacks --
        ('Chips', 'Potato chips.', 1.50, 1.20, 45, 8),
        ('Chocolate', 'Milk chocolate.', 2.00, 1.80, 46, 8),
        ('Popcorn', 'Buttery popcorn.', 1.20, 1.00, 47, 8),
        ('Candy', 'Mixed candy.', 1.00, 0.80, 48, 8),
        ('Nuts', 'Salted mixed nuts.', 2.50, 2.20, 49, 8),
        -- vegetables
        ('Carrot', 'Crunchy carrots.', 0.80, 0.70, 50, 9),
        ('Broccoli', 'Fresh broccoli.', 1.50, 1.20, 51, 9),
        ('Potato', 'Golden potatoes.', 0.60, 0.50, 52, 9),
        ('Spinach', 'Organic spinach.', 1.00, 0.90, 53, 9),
        ('Onion', 'Sweet onions.', 0.70, 0.60, 54, 9);

`;

async function main() {
    console.log("seeding...");
    const dbUrl = `${process.env.DATABASE_URL}`;

    const client = new Client({
        connectionString: dbUrl,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();