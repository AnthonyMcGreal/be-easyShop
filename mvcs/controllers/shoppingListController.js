const { makeShoppingList } = require('../models/shoppingListModels')

exports.getShoppingList = (req, res, next) => {
	const { body } = req
	makeShoppingList(body)
		.then(shoppingList => {
			res.status(200).send({ shoppingList })
		})
		.catch(next)
}
