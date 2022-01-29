const apiRouter = require('express').Router();
const userRouter = require('./usersRouter');
const miscItemRouter = require('./miscItemsRouter');
const ingredientsRouter = require('./ingredientsRouter');
const recipeRouter = require('./recipeRouter');
const mealPlansRouter = require('./mealPlansRouter');

apiRouter.use('/user', userRouter);
apiRouter.use('/miscItem', miscItemRouter);
apiRouter.use('/ingredients', ingredientsRouter);
apiRouter.use('/recipe', recipeRouter);
apiRouter.use('/mealPlans', mealPlansRouter);

module.exports = apiRouter;
