const {
	selectAllIngredients,
	insertIngredient,
	updateIngredientById,
	removeIngredientById
} = require('../models/ingredientsModels')

exports.getAllIngredients = (req, res, next) => {
	const { user_id } = req.params
	selectAllIngredients(user_id).then(ingredients => {
		res.status(200).send({ ingredients })
	})
}
exports.postIngredient = (req, res, next) => {
	const { name, unit_of_measurement, storage_type, user_id } = req.body
	insertIngredient(name, unit_of_measurement, storage_type, user_id)
		.then(ingredient => {
			res.status(201).send({ ingredient })
		})
		.catch(next)
}
exports.patchIngredientsById = (req, res, next) => {
	const { ingredient_id } = req.params
	const { name, unit_of_measurement, storage_type, user_id } = req.body
	updateIngredientById(
		ingredient_id,
		name,
		unit_of_measurement,
		storage_type,
		user_id
	).then(ingredient => {
		if (!ingredient) {
			res.status(404).send({ msg: 'Not Found' })
		} else {
			res.status(200).send({ ingredient })
		}
	})
}
exports.deleteIngredientsById = (req, res, next) => {
	const { ingredient_id } = req.params
	removeIngredientById(ingredient_id).then(ingredient => {
		if (ingredient.rows.length === 0) {
			res.status(404).send({ msg: 'Not Found' })
		} else {
			res.sendStatus(204)
		}
	})
}
