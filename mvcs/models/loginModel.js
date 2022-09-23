const db = require('../../db/connection')
const format = require('pg-format')
const bcrypt = require('bcryptjs')

exports.login = async body => {
	let { email, password } = body

	if (!email || !password) {
		return Promise.reject({ status: 400, msg: 'Bad Request' })
	}

	let queryStr = format(`SELECT * FROM users WHERE email = %L;`, [email])

	let user = await db.query(queryStr)

	let passwordCheck = await bcrypt.compare(password, user.rows[0].password)

	if (passwordCheck) {
		return {
			user_id: user.rows[0].user_id,
			email: user.rows[0].email
		}
	} else {
		return Promise.reject({ status: 400, msg: 'Login failed' })
	}
}
