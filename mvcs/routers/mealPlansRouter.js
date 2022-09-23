const { userAuth } = require('../auth')
const {
	getAllMealPlans,
	getMealPlansByName,
	postMealPlans,
	patchMealPlanByName,
	deleteMealPlanByName
} = require('../controllers/mealPlansController')

const mealPlansRouter = require('express').Router()

mealPlansRouter
	.route('/')
	.get(userAuth, getAllMealPlans)
	.post(userAuth, postMealPlans)
mealPlansRouter
	.route('/:mealPlanName')
	.get(userAuth, getMealPlansByName)
	.patch(userAuth, patchMealPlanByName)
	.delete(userAuth, deleteMealPlanByName)

module.exports = mealPlansRouter
