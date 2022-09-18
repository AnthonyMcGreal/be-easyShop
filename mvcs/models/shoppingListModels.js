const db = require('../../db/connection')
const format = require('pg-format')
const { selectRecipeById } = require('./recipeModels')

exports.makeShoppingList = async body => {
	const miscItems = body.miscItems
	const recipes = body.recipes

	miscItemsShoppingList = []
	ingredientsShoppingList = []

	const getMiscItems = async () => {
		for (let miscItem in miscItems) {
			for (let i = 0; i < miscItems[miscItem]; i++) {
				const queryStr = format(`SELECT * FROM miscItems WHERE name = %L;`, [
					miscItem
				])
				await db.query(queryStr).then(item => {
					miscItemsShoppingList.push(item.rows)
				})
			}
		}
	}

	const getAllIngredients = async () => {
		for (let recipe in recipes) {
			for (let i = 0; i < recipes[recipe]; i++) {
				await selectRecipeById(recipe).then(ingredients => {
					ingredientsShoppingList.push(ingredients)
				})
			}
		}
	}

	const results = Promise.all([getMiscItems(), getAllIngredients()]).then(
		() => {
			const finalIngredientList = []
			const finalMiscItemsList = []

			const refinedMiscItems = miscItemsShoppingList.flat().map(item => {
				return {
					name: item.name,
					category: item.category,
					quantity: 1
				}
			})

			refinedMiscItems.forEach(item => {
				for (let i = 0; i < finalMiscItemsList.length; i++) {
					if (finalMiscItemsList[i].name === item.name) {
						finalMiscItemsList[i].quantity += item.quantity
						return
					}
				}
				finalMiscItemsList.push(item)
			})

			const refinedIngredients = ingredientsShoppingList
				.flat()
				.map(ingredient => {
					return {
						name: ingredient.name,
						ingredient_quantity: ingredient.ingredient_quantity,
						unit_of_measurement: ingredient.unit_of_measurement,
						storage_type: ingredient.storage_type
					}
				})

			refinedIngredients.forEach(ingredient => {
				for (let i = 0; i < finalIngredientList.length; i++) {
					if (finalIngredientList[i].name === ingredient.name) {
						finalIngredientList[i].ingredient_quantity +=
							ingredient.ingredient_quantity
						return
					}
				}
				finalIngredientList.push(ingredient)
			})

			const sortedShoppingList = {}
			finalIngredientList.forEach(ingredient => {
				updatedIngredient = {
					name: ingredient.name,
					quantity: ingredient.ingredient_quantity,
					unit_of_measurement: ingredient.unit_of_measurement
				}
				if (!sortedShoppingList.hasOwnProperty(ingredient.storage_type)) {
					sortedShoppingList[ingredient.storage_type] = [updatedIngredient]
				} else {
					sortedShoppingList[ingredient.storage_type].push(updatedIngredient)
				}
			})

			finalMiscItemsList.forEach(item => {
				updatedItem = { name: item.name, quantity: item.quantity }
				if (!sortedShoppingList.hasOwnProperty(item.category)) {
					sortedShoppingList[item.category] = [updatedItem]
				} else {
					sortedShoppingList[item.category].push(updatedItem)
				}
			})

			return sortedShoppingList
		}
	)

	return results
}
