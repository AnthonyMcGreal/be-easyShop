const { userAuth } = require('../auth')
const {
	postUser,
	deleteUserByUsername,
	getUserByUsername
} = require('../controllers/userController')

const usersRouter = require('express').Router()

usersRouter.route('/').post(postUser)

usersRouter
	.route('/:user_id')
	.get(userAuth, getUserByUsername)
	.delete(userAuth, deleteUserByUsername)

module.exports = usersRouter
