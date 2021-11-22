const usersRouter = require('express').Router();
const { getUserByUsername } = require();

usersRouter.route('/:username').get(getUserByUsername);

module.exports = usersRouter;
