const {
	postUser,
	deleteUserByUsername,
	getUserByUsername
} = require('../controllers/userController')

const usersRouter = require('express').Router()

usersRouter.route('/').post(postUser)

usersRouter
	.route('/:user_id')
	.get(getUserByUsername)
	.delete(deleteUserByUsername)

module.exports = usersRouter
