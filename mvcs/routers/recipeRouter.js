const { userAuth } = require('../auth')
const {
	getAllRecipes,
	postRecipe,
	getRecipeById,
	deleteRecipeByName,
	patchRecipeByName
} = require('../controllers/recipeControllers')

const recipeRouter = require('express').Router()

recipeRouter.route('/').post(userAuth, postRecipe)
recipeRouter.route('/:user_id').get(userAuth, getAllRecipes)
recipeRouter.route('/:name').patch(userAuth, patchRecipeByName)
recipeRouter
	.route('/:user_id/:name')
	.get(userAuth, getRecipeById)
	.delete(userAuth, deleteRecipeByName)

module.exports = recipeRouter
