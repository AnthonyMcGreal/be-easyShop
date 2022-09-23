const { userAuth } = require('../auth')
const {
	getAllIngredients,
	postIngredient,
	patchIngredientsById,
	deleteIngredientsById
} = require('../controllers/ingredientsController')

const ingredientsRouter = require('express').Router()

ingredientsRouter
	.route('/')
	.get(userAuth, getAllIngredients)
	.post(userAuth, postIngredient)
ingredientsRouter
	.route('/:ingredient_id')
	.patch(userAuth, patchIngredientsById)
	.delete(userAuth, deleteIngredientsById)

module.exports = ingredientsRouter
