const db = require('../connection.js')
const format = require('pg-format')
const {
	formatUsersData,
	formatMiscItemsData,
	formatIngredientsData,
	formatRecipeData,
	formatMealPlansData
} = require('../utils/data_manipulation.js')

const seed = async ({
	usersData,
	miscItemsData,
	ingredientsData,
	recipesData,
	templatesData
}) => {
	await db.query(`DROP TABLE IF EXISTS mealPlans`)
	await db.query(`DROP TABLE IF EXISTS recipes`)
	await db.query(`DROP TABLE IF EXISTS ingredients`)
	await db.query(`DROP TABLE IF EXISTS miscItems`)
	await db.query(`DROP TABLE IF EXISTS users`)

	await db.query(`CREATE TABLE users (
      user_id UUID PRIMARY KEY NOT NULL,
			email VARCHAR(60) NOT NULL,
			password VARCHAR NOT NULL
  );`)

	await db.query(`CREATE TABLE miscItems (
	    item_id SERIAL PRIMARY KEY,
	    name TEXT NOT NULL,
	    user_id UUID REFERENCES users(user_id) ON UPDATE CASCADE,
	    category TEXT NOT NULL
	);`)

	await db.query(`CREATE TABLE ingredients (
	    ingredient_id SERIAL PRIMARY KEY,
	    name TEXT NOT NULL,
	    unit_of_measurement VARCHAR(20) DEFAULT 0 NOT NULL,
	    storage_type TEXT NOT NULL,
	    user_id UUID REFERENCES users(user_id) ON UPDATE CASCADE
	);`)

	await db.query(`CREATE TABLE recipes (
	    recipe_id SERIAL PRIMARY KEY,
	    recipe_name TEXT NOT NULL,
	    user_id UUID REFERENCES users(user_id) ON UPDATE CASCADE,
	    link TEXT,
	    ingredients INT REFERENCES ingredients(ingredient_id) ON DELETE CASCADE,
	    ingredient_quantity REAL NOT NULL,
	    portions INT NOT NULL
	);`)

	await db.query(`CREATE TABLE mealPlans (
	    template_id SERIAL PRIMARY KEY,
	    name TEXT NOT NULL,
	    user_id UUID REFERENCES users(user_id) ON UPDATE CASCADE,
	    recipes JSONB
	);`)

	let insertUsersData = format(
		`INSERT INTO users
      (user_id, email, password)
      VALUES %L
      RETURNING *;`,
		formatUsersData(usersData)
	)

	await db.query(insertUsersData)

	let insertMiscItemsData = format(
		`INSERT INTO miscItems
	    (name, user_id, category)
	    VALUES %L
	    RETURNING *;`,
		formatMiscItemsData(miscItemsData)
	)

	await db.query(insertMiscItemsData)

	let insertIngredientsData = format(
		`INSERT INTO ingredients
	    (name, unit_of_measurement, storage_type, user_id )
	    VALUES %L
	    RETURNING *;`,
		formatIngredientsData(ingredientsData)
	)

	await db.query(insertIngredientsData)

	let insertRecipesData = format(
		`INSERT INTO recipes
	    (recipe_name, user_id, link, ingredients, ingredient_quantity, portions)
	    VALUES %L
	    RETURNING *;`,
		formatRecipeData(recipesData)
	)

	await db.query(insertRecipesData)

	let insertMealPlans = format(
		`INSERT INTO mealPlans
	    (name, user_id, recipes)
	    VALUES %L
	    RETURNING *;`,
		formatMealPlansData(templatesData)
	)

	await db.query(insertMealPlans)
}

module.exports.seed = seed
