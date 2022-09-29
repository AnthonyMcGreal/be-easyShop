const db = require('../../db/connection')
const format = require('pg-format')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')

exports.selectUserByUsername = user_id => {
	let queryStr = format(`SELECT * FROM users WHERE user_id= %L;`, [user_id])

	return db.query(queryStr).then(user => {
		return user.rows
	})
}

exports.insertUser = async (email, password) => {
	if (!email || !password) {
		return Promise.reject({ status: 400, msg: 'Bad Request' })
	}

	let checkForExistingUserQueryString = format(
		`SELECT * FROM users WHERE email = %L;`,
		[email]
	)

	let checkForExistingUser = await db.query(checkForExistingUserQueryString)

	if (checkForExistingUser.rowCount > 0)
		return Promise.reject({ status: 400, msg: 'Bad Request' })

	let newUUID = uuidv4()
	let encryptedPassword = await bcrypt.hash(password, 10)

	let dataArray = [[newUUID, email, encryptedPassword]]

	let queryStr = format(
		`INSERT INTO users (user_id, email, password)
  VALUES
  %L
  RETURNING *`,
		dataArray
	)

	return db.query(queryStr).then(({ rows }) => {
		return rows[0]
	})
}

exports.removeUserByUsername = user_id => {
	let queryStr = format(`SELECT * FROM users WHERE user_id = %L;`, [user_id])

	return db.query(queryStr).then(user => {
		const nameToBeDeleted = user.rows.name
		if (user.rows.length === 0) {
			return Promise.reject({ status: 404, msg: 'Not Found' })
		}

		return db.query(`DELETE FROM users WHERE user_id = $1;`, [nameToBeDeleted])
	})
}
