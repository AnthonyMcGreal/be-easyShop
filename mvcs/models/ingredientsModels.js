const db = require('../../db/connection')
const format = require('pg-format')

exports.selectAllIngredients = () => {
	let queryStr = `SELECT * FROM ingredients;`

	return db.query(queryStr).then(({ rows }) => {
		return rows
	})
}

exports.insertIngredient = (
	name,
	unit_of_measurement,
	storage_type,
	user_id
) => {
	if (!name || !unit_of_measurement || !storage_type || !user_id) {
		return Promise.reject({ status: 400, msg: 'Bad Request' })
	}

	let formattedData = [[name, unit_of_measurement, storage_type, user_id]]
	let queryStr = format(
		`INSERT INTO ingredients
        (name, unit_of_measurement, storage_type, user_id)
        VALUES
        %L
        RETURNING *;`,
		formattedData
	)
	return db.query(queryStr).then(({ rows }) => {
		return rows[0]
	})
}

exports.updateIngredientById = (
	ingredient_id,
	name,
	unit_of_measurement,
	storage_type,
	user_id
) => {
	return db
		.query(
			`UPDATE ingredients 
      SET name = $2, unit_of_measurement = $3, storage_type = $4, user_id = $5
      WHERE ingredient_id = $1 AND user_id = $5
      RETURNING *;`,
			[ingredient_id, name, unit_of_measurement, storage_type, user_id]
		)
		.then(({ rows }) => {
			return rows[0]
		})
}

exports.removeIngredientById = ingredient_id => {
	return db.query(
		`DELETE FROM ingredients WHERE ingredient_id = $1 RETURNING *;`,
		[ingredient_id]
	)
}
