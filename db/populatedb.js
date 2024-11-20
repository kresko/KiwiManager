#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `

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

    INSERT INTO images (filename, url, type, created_at, updated_at)
    VALUES
        ('bakery.jpg', '/images/bakery.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('beverages.jpg', '/images/beverages.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('cleaning-products.jpg', '/images/cleaning-products.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('dairy.jpg', '/images/dairy.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('fruits.jpg', '/images/fruits.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('meat.jpg', '/images/meat.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('personal-care.jpg', '/images/personal-care.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('snacks.jpg', '/images/snacks.jpg', 'category', CURRENT_DATE, CURRENT_DATE),
        ('vegetables.jpg', '/images/vegetables.jpg', 'category', CURRENT_DATE, CURRENT_DATE);

    INSERT INTO categories (name, fk_image)
    VALUES
        ('Bakery', 1),
        ('Beverages', 2),
        ('Cleaning Products', 3),
        ('Dairy', 4),
        ('Fruits', 5),
        ('Meat', 6),
        ('Personal Care', 7),
        ('Snacks', 8),
        ('Vegetables', 9);

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