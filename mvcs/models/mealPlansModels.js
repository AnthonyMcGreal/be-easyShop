const db = require('../../db/connection')
const format = require('pg-format')
const {
	deleteIngredientsById
} = require('../controllers/ingredientsController')

exports.selectAllMealPlans = user_id => {
	return db
		.query(`SELECT DISTINCT name, user_id FROM mealPlans WHERE user_id = $1;`, [
			user_id
		])
		.then(({ rows }) => {
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
	let { name, user_id, recipes } = body[0]
	recipes = JSON.stringify(recipes)

	let queryStr = format(
		`INSERT INTO mealPlans
          (name, user_id, recipes)
          VALUES
          %L
          RETURNING *;`,
		[[name, user_id, recipes]]
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
	let newMealPlanName = body.name

	const updateMealPlan = async () => {
		let { template_id, name, user_id, recipes } = body
		recipes = JSON.stringify(recipes)

		return db.query(
			`UPDATE mealPlans
        SET name = $2, user_id = $3, recipes = $4
        WHERE template_id = $1
        RETURNING *;`,
			[template_id, name, user_id, recipes]
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

exports.removeMealPlanByName = (mealPlanName, user_id) => {
	return db.query(
		`DELETE FROM mealPlans WHERE name = $1 AND user_id = $2 RETURNING *;`,
		[mealPlanName, user_id]
	)
}
