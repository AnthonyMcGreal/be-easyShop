const {
  postUser,
  patchUserByUsername,
  deleteUserByUsername,
  getUserByUsername,
} = require('../controllers/userController');

const usersRouter = require('express').Router();

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .post(postUser)
  .patch(patchUserByUsername)
  .delete(deleteUserByUsername);

module.exports = usersRouter;
