const db = require('../../db/connection')
const format = require('pg-format')
const {
	deleteIngredientsById
} = require('../controllers/ingredientsController')

exports.selectAllMealPlans = () => {
	let queryStr = `SELECT DISTINCT name FROM mealPlans;`

	return db.query(queryStr).then(({ rows }) => {
		return rows
	})
}

exports.selectMealPlansByName = mealPlanName => {
	let queryStr = format(`SELECT * FROM mealPlans WHERE name = %L`, [
		mealPlanName
	])

	return db.query(queryStr).then(({ rows }) => {
		return rows
	})
}

exports.insertMealPlans = async body => {
	let mealPlanName = body[0].name
	let { name, username, recipes } = body[0]
	recipes = JSON.stringify(recipes)

	let queryStr = format(
		`INSERT INTO mealPlans
          (name, username, recipes)
          VALUES
          %L
          RETURNING *;`,
		[[name, username, recipes]]
	)
	return db.query(queryStr).then(({ rows }) => {
		let selectQueryStr = format(`SELECT * FROM mealPlans WHERE name = %L`, [
			mealPlanName
		])

		return db.query(selectQueryStr).then(({ rows }) => {
			return rows
		})
	})
}

exports.updateMealPlanByName = async body => {
	let newMealPlanName = body[0].name

	const updateMealPlan = async () => {
		return Promise.all(
			body.map(meals => {
				let { template_id, name, username, recipes } = meals
				recipes = JSON.stringify(recipes)

				return db.query(
					`UPDATE mealPlans
        SET name = $2, username = $3, recipes = $4
        WHERE template_id = $1
        RETURNING *;`,
					[template_id, name, username, recipes]
				)
			})
		)
	}

	await updateMealPlan()

	let queryStr = format(`SELECT * FROM mealPlans WHERE name = %L`, [
		newMealPlanName
	])

	return db.query(queryStr).then(({ rows }) => {
		return rows
	})
}

exports.removeMealPlanByName = mealPlanName => {
	return db.query(`DELETE FROM mealPlans WHERE name = $1 RETURNING *;`, [
		mealPlanName
	])
}
