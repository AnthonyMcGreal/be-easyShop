const apiRouter = require('express').Router();
const userRouter = require('./usersRouter');

apiRouter.use('/user', userRouter);

module.exports = apiRouter;
