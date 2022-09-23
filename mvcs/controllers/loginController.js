const { login } = require('../models/loginModel')
const { createJWT } = require('../jwt')

exports.postLogin = (req, res, next) => {
	const { body } = req
	login(body)
		.then(result => {
			if (result) {
				const token = createJWT(result.user_id, result.email)
				res.status(200).cookie('jwt', token).send({ msg: 'Login successful' })
			}
		})
		.catch(next)
}
