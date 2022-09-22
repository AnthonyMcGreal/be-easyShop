const db = require('../connection.js')

exports.formatUsersData = userData => {
	const formattedData = userData.map(userObject => {
		return [userObject.user_id, userObject.email, userObject.password]
	})
	return formattedData
}

exports.formatMiscItemsData = miscItemsData => {
	const formattedData = miscItemsData.map(itemData => {
		return [itemData.name, itemData.user_id, itemData.category]
	})
	return formattedData
}

exports.formatIngredientsData = ingredientsData => {
	const formattedData = ingredientsData.map(ingredient => {
		return [
			ingredient.name,
			ingredient.unit_of_measurement,
			ingredient.storage_type,
			ingredient.user_id
		]
	})
	return formattedData
}

exports.formatRecipeData = recipeData => {
	const formattedData = recipeData.map(recipe => {
		return [
			recipe.name,
			recipe.user_id,
			recipe.link,
			recipe.ingredients,
			recipe.ingredient_quantity,
			recipe.portions
		]
	})
	return formattedData
}

exports.formatMealPlansData = mealPlanData => {
	const formattedData = mealPlanData.map(mealPlan => {
		return [mealPlan.name, mealPlan.user_id, JSON.stringify(mealPlan.recipes)]
	})
	return formattedData
}
