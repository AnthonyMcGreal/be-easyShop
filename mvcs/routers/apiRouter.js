const apiRouter = require('express').Router()
const userRouter = require('./usersRouter')
const miscItemRouter = require('./miscItemsRouter')
const ingredientsRouter = require('./ingredientsRouter')
const recipeRouter = require('./recipeRouter')
const mealPlansRouter = require('./mealPlansRouter')
const shoppingListRouter = require('./shoppingListRouter')
const { getEndPoints } = require('../controllers/endpointsController')

apiRouter.route('/').get(getEndPoints)
apiRouter.use('/user', userRouter)
apiRouter.use('/miscItem', miscItemRouter)
apiRouter.use('/ingredients', ingredientsRouter)
apiRouter.use('/recipe', recipeRouter)
apiRouter.use('/mealPlans', mealPlansRouter)
apiRouter.use('/shoppingList', shoppingListRouter)

module.exports = apiRouter
