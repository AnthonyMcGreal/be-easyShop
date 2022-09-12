const { getShoppingList } = require('../controllers/shoppingListController')

const shoppingListRouter = require('express').Router()

shoppingListRouter.route('/').post(getShoppingList)

module.exports = shoppingListRouter
