const apiRouter = require('express').Router();
const userRouter = require('./usersRouter');
const miscItemRouter = require('./miscItemsRouter');
const ingredientsRouter = require('./ingredientsRouter');

apiRouter.use('/user', userRouter);
apiRouter.use('/miscItem', miscItemRouter);
apiRouter.use('/ingredients', ingredientsRouter);

module.exports = apiRouter;
