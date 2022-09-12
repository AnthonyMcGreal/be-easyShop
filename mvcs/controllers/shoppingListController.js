const { makeShoppingList } = require('../models/shoppingListModels')

exports.getShoppingList = (req, res, next) => {
	makeShoppingList(req.body)
		.then(shoppingList => {
			res.status(200).send({ shoppingList })
		})
		.catch(next)
}
