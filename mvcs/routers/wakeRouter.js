const { wakeUp } = require('../controllers/wakeController')

const wakeRouter = require('express').Router()

wakeRouter.route('/').get(wakeUp)

module.exports = wakeRouter
