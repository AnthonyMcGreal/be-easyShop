const {
	selectUserByUsername,
	insertUser,
	updateUserByUsername,
	removeUserByUsername
} = require('../models/userModels')

exports.getUserByUsername = (req, res, next) => {
	const { username } = req.params
	selectUserByUsername(username).then(user => {
		if (user.length === 0) {
			res.status(404).send({ msg: 'Not Found' })
		} else {
			res.status(200).send({ user })
		}
	})
}

exports.postUser = (req, res, next) => {
	const { name, username, avatar_url } = req.body
	insertUser(name, username, avatar_url)
		.then(user => {
			res.status(201).send({ user })
		})
		.catch(next)
}

exports.patchUserByUsername = (req, res, next) => {
	const originalUsername = req.params.username
	const { name, username, avatar_url } = req.body
	updateUserByUsername(name, username, avatar_url, originalUsername)
		.then(user => {
			if (user.length === 0) {
				res.status(404).send({ msg: 'Not Found' })
			} else {
				res.status(200).send({ user })
			}
		})
		.catch(next)
}

exports.deleteUserByUsername = (req, res, next) => {
	const { username } = req.params

	removeUserByUsername(username)
		.then(response => {
			res.sendStatus(204)
		})
		.catch(next)
}
