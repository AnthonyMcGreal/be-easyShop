const { userAuth } = require('../auth')
const {
	getAllIngredients,
	postIngredient,
	patchIngredientsById,
	deleteIngredientsById
} = require('../controllers/ingredientsController')

const ingredientsRouter = require('express').Router()

ingredientsRouter.route('/').post(userAuth, postIngredient)
ingredientsRouter.route('/:user_id').get(userAuth, getAllIngredients)
ingredientsRouter
	.route('/:ingredient_id')
	.patch(userAuth, patchIngredientsById)
	.delete(userAuth, deleteIngredientsById)

module.exports = ingredientsRouter
