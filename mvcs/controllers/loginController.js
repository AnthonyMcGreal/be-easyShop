const { login } = require('../models/loginModel')

exports.postLogin = (req, res, next) => {
	const { body } = req
	login(body)
		.then(result => {
			if (result) {
				res.status(200).send({ msg: 'Login successful' })
			} else {
				res.status(400).send({ msg: 'Login failed' })
			}
		})
		.catch(next)
}
