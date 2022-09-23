const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET

exports.createJWT = (user_id, email) => {
	const maxAge = 3 * 60 * 60
	const token = jwt.sign({ id: user_id, email }, jwtSecret, {
		expiresIn: maxAge
	})

	return token
}
