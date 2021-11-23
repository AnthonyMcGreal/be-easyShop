const apiRouter = require('express').Router();
const userRouter = require('./usersRouter');
const miscItemsRouter = require('./miscItemsRouter');

apiRouter.use('/user', userRouter);
apiRouter.use('/miscItems', miscItemsRouter);

module.exports = apiRouter;
