const {
	selectAllRecipes,
	selectRecipeById,
	insertRecipe,
	removeRecipeByName,
	updateRecipeByName
} = require('../models/recipeModels')

exports.getAllRecipes = (req, res, next) => {
	const { user_id } = req.params
	selectAllRecipes(user_id).then(recipes => {
		res.status(200).send({ recipes })
	})
}

exports.getRecipeById = (req, res, next) => {
	const { user_id, name } = req.params
	selectRecipeById(user_id, name).then(recipe => {
		if (recipe.length === 0) {
			res.status(404).send({ msg: 'Not Found' })
		} else {
			res.status(200).send(recipe)
		}
	})
}

exports.postRecipe = async (req, res, next) => {
	const { body } = req
	insertRecipe(body)
		.then(recipe => {
			res.status(201).send({ recipe })
		})
		.catch(next)
}

exports.patchRecipeByName = (req, res, next) => {
	const { body } = req
	updateRecipeByName(body).then(recipe => {
		res.status(200).send({ recipe })
	})
}

exports.deleteRecipeByName = (req, res, next) => {
	const { name } = req.params
	removeRecipeByName(name).then(recipe => {
		if (recipe.rows.length === 0) {
			res.status(404).send({ msg: 'Not Found' })
		} else {
			res.sendStatus(204)
		}
	})
}
