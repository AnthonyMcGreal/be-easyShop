const { postLogin } = require('../controllers/loginController')

const loginRouter = require('express').Router()

loginRouter.route('/').post(postLogin)

module.exports = loginRouter
