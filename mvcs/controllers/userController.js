const {
	selectUserByUsername,
	insertUser,
	removeUserByUsername
} = require('../models/userModels')

exports.getUserByUsername = (req, res, next) => {
	const { user_id } = req.params
	selectUserByUsername(user_id).then(user => {
		if (user.length === 0) {
			res.status(404).send({ msg: 'Not Found' })
		} else {
			res.status(200).send({ user })
		}
	})
}

exports.postUser = (req, res, next) => {
	const { email, password } = req.body
	insertUser(email, password)
		.then(user => {
			res.status(201).send({ user })
		})
		.catch(next)
}

exports.deleteUserByUsername = (req, res, next) => {
	const { user_id } = req.params

	removeUserByUsername(user_id)
		.then(response => {
			res.sendStatus(204)
		})
		.catch(next)
}
