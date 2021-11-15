const db = require('../connection.js');
const format = require('pg-format');

const seed = async ({}) => {
  await db.query(`DROP TABLE IF EXISTS mealPlans`);
  await db.query(`DROP TABLE IF EXISTS recipes`);
  await db.query(`DROP TABLE IF EXISTS ingredients`);
  await db.query(`DROP TABLE IF EXISTS miscItems`);
  await db.query(`DROP TABLE IF EXISTS users`);

  await db.query(`CREATE TABLE users (
      name TEXT PRIMARY KEY NOT NULL,
      username VARCHAR(60) NOT NULL,
      avatar_url TEXT
  );`);

  await db.query(`CREATE TABLE miscItems (
      item_id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      user VARCHAR(60) REFERENCES users(name),
      category TEXT NOT NULL
  );`);

  await db.query(`CREATE TABLE ingredients (
      ingredient_id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      unit_of_measurement INT DEFAULT 0 NOT NULL,
      storage_type TEXT NOT NULL,
      user VARCHAR(60) REFERENCES users(name)
  );`);

  await db.query(`CREATE TABLE recipes (
      recipe_id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      user VARCHAR(60) REFERENCES users(username),
      link TEXT,
      ingredients TEXT REFERENCES ingredients(name),
      ingredient_quantity INT NOT NULL,
      portions INT NOT NULL
  );`);

  await db.query(`CREATE TABLE mealPlans (
      template_id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      user VARCHAR(60) REFERENCES users(name),
      day INT NOT NULL,
      day_part TEXT NOT NULL,
      recipe TEXT REFERENCES recipes(name),
  );`);
};
