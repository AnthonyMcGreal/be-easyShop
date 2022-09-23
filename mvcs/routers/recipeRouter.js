const { userAuth } = require('../auth')
const {
	getAllRecipes,
	postRecipe,
	getRecipeById,
	deleteRecipeByName,
	patchRecipeByName
} = require('../controllers/recipeControllers')

const recipeRouter = require('express').Router()

recipeRouter.route('/').get(userAuth, getAllRecipes).post(userAuth, postRecipe)
recipeRouter
	.route('/:name')
	.get(userAuth, getRecipeById)
	.patch(userAuth, patchRecipeByName)
	.delete(userAuth, deleteRecipeByName)

module.exports = recipeRouter
