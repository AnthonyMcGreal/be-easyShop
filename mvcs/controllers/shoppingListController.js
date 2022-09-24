const { makeShoppingList } = require('../models/shoppingListModels')

exports.getShoppingList = (req, res, next) => {
	const { user_id } = req.params
	const { body } = req
	makeShoppingList(user_id, body)
		.then(shoppingList => {
			res.status(200).send({ shoppingList })
		})
		.catch(next)
}
