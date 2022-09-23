const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET

exports.userAuth = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1]
	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				return res.status(401).json({ message: 'Not authorized' })
			} else {
				next()
			}
		})
	} else {
		return res
			.status(401)
			.json({ message: 'Not authorized, token not available' })
	}
}
