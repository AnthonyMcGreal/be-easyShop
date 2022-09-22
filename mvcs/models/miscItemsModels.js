const db = require('../../db/connection')
const format = require('pg-format')

exports.selectMiscItemById = miscItem_id => {
	if (/[a-z]/gi.test(miscItem_id)) {
		return Promise.reject({ status: 400, msg: 'Bad Request' })
	}

	const queryStr = format(`SELECT * FROM miscItems WHERE item_id = %L;`, [
		miscItem_id
	])

	return db.query(queryStr).then(user => {
		return user.rows
	})
}

exports.insertMiscItem = item => {
	const { name, user_id, category } = item
	const formattedData = [[name, user_id, category]]

	if (!name || !user_id || !category) {
		return Promise.reject({ status: 400, msg: 'Bad Request' })
	}

	let inputString = format(
		`INSERT INTO miscItems
        (name, user_id, category)
        VALUES
        %L
        RETURNING *;`,
		formattedData
	)

	return db.query(inputString).then(({ rows }) => {
		return rows[0]
	})
}

exports.selectAllMiscItems = () => {
	let queryStr = `SELECT * FROM miscItems;`

	return db.query(queryStr).then(({ rows }) => {
		return rows
	})
}

exports.removeMiscItemById = miscItem_id => {
	return db.query(`DELETE FROM miscItems WHERE item_id = $1 RETURNING *;`, [
		miscItem_id
	])
}
