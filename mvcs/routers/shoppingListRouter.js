const { userAuth } = require('../auth')
const { getShoppingList } = require('../controllers/shoppingListController')

const shoppingListRouter = require('express').Router()

shoppingListRouter.route('/:user_id').post(userAuth, getShoppingList)

module.exports = shoppingListRouter
