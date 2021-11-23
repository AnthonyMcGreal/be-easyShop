const apiRouter = require('express').Router();
const userRouter = require('./usersRouter');
const miscItemRouter = require('./miscItemsRouter');

apiRouter.use('/user', userRouter);
apiRouter.use('/miscItem', miscItemRouter);

module.exports = apiRouter;
