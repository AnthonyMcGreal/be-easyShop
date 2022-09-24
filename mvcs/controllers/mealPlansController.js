const {
	selectAllMealPlans,
	selectMealPlansByName,
	insertMealPlans,
	updateMealPlanByName,
	removeMealPlanByName
} = require('../models/mealPlansModels')

exports.getAllMealPlans = (req, res, next) => {
	const { user_id } = req.params
	selectAllMealPlans(user_id).then(mealPlans => {
		res.status(200).send({ mealPlans })
	})
}

exports.getMealPlansByName = (req, res, next) => {
	const { mealPlanName } = req.params
	selectMealPlansByName(mealPlanName)
		.then(meals => {
			if (meals.length === 0) {
				res.status(404).send({ msg: 'Not Found' })
			} else {
				res.status(200).send({ meals })
			}
		})
		.catch(next)
}

exports.postMealPlans = (req, res, next) => {
	const { body } = req
	insertMealPlans(body)
		.then(mealPlan => {
			res.status(201).send({ mealPlan })
		})
		.catch(next)
}

exports.patchMealPlanByName = (req, res, next) => {
	const { body } = req
	updateMealPlanByName(body).then(mealPlan => {
		res.status(200).send({ mealPlan })
	})
}

exports.deleteMealPlanByName = (req, res, next) => {
	const { mealPlanName, user_id } = req.params
	removeMealPlanByName(mealPlanName, user_id).then(mealPlan => {
		if (mealPlan.rows.length === 0) {
			res.status(404).send({ msg: 'Not Found' })
		} else {
			res.sendStatus(204)
		}
	})
}
