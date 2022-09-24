const db = require('../../db/connection')
const format = require('pg-format')
const {
	deleteIngredientsById
} = require('../controllers/ingredientsController')
const { query } = require('../../db/connection')

exports.selectAllRecipes = user_id => {
	return db
		.query(
			`SELECT recipe_name, portions, user_id FROM recipes WHERE user_id = $1;`,
			[user_id]
		)
		.then(({ rows }) => {
			let distinctRecipes = []
			rows.forEach(recipe => {
				for (let i = 0; i <= distinctRecipes.length; i++) {
					if (!distinctRecipes[i]) {
						distinctRecipes.push(recipe)
						return
					}
					if (distinctRecipes[i].recipe_name === recipe.recipe_name) return
				}
				distinctRecipes.push(recipe)
			})
			return distinctRecipes
		})
}
exports.selectRecipeById = (user_id, name) => {
	return db
		.query(
			`SELECT recipes.recipe_id, recipes.user_id, recipes.recipe_name, recipes.link, recipes.ingredients, ingredients.name, recipes.ingredient_quantity, ingredients.unit_of_measurement, recipes.portions, ingredients.storage_type FROM recipes
  JOIN ingredients
  ON recipes.ingredients = ingredients.ingredient_id
  WHERE recipes.user_id = $1 AND recipe_name = $2`,
			[user_id, name]
		)
		.then(({ rows }) => {
			return rows
		})
}

exports.insertRecipe = async body => {
	let recipeName = body[0].recipe_name

	const insertIngredients = async () => {
		return Promise.all(
			body.map(ingredient => {
				let {
					recipe_name,
					user_id,
					link,
					ingredients,
					ingredient_quantity,
					portions
				} = ingredient

				let queryStr = format(
					`INSERT INTO recipes
      (recipe_name, user_id, link, ingredients, ingredient_quantity, portions)
        VALUES
        %L
        RETURNING *;`,
					[
						[
							recipe_name,
							user_id,
							link,
							ingredients,
							ingredient_quantity,
							portions
						]
					]
				)

				return db.query(queryStr)
			})
		)
	}

	await insertIngredients()

	let queryStr = format(
		`SELECT recipe_name, user_id, link, ingredients, ingredient_quantity, portions FROM recipes WHERE recipe_name = %L;`,
		[recipeName]
	)

	return db.query(queryStr).then(({ rows }) => {
		return rows
	})
}

exports.updateRecipeByName = async body => {
	let recipeName = body[0].name

	const updateRecipe = async () => {
		return Promise.all(
			body.map(ingredient => {
				let {
					recipe_id,
					name,
					user_id,
					link,
					ingredients,
					ingredient_quantity,
					portions
				} = ingredient

				return db.query(
					`UPDATE recipes
          SET recipe_name = $2, link = $4, ingredients = $5, ingredient_quantity = $6, portions = $7
          WHERE recipe_id = $1 AND user_id = $3
          RETURNING *;`,
					[
						recipe_id,
						name,
						user_id,
						link,
						ingredients,
						ingredient_quantity,
						portions
					]
				)
			})
		)
	}

	await updateRecipe()

	let queryStr = format(`SELECT * FROM recipes WHERE recipe_name = %L`, [
		recipeName
	])

	return db.query(queryStr).then(({ rows }) => {
		return rows
	})
}

exports.removeRecipeByName = name => {
	return db.query('DELETE FROM recipes WHERE recipe_name = $1 RETURNING *;', [
		name
	])
}
