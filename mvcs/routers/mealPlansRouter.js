const { userAuth } = require('../auth')
const {
	getAllMealPlans,
	getMealPlansByName,
	postMealPlans,
	patchMealPlanByName,
	deleteMealPlanByName
} = require('../controllers/mealPlansController')

const mealPlansRouter = require('express').Router()

mealPlansRouter.route('/').post(userAuth, postMealPlans)
mealPlansRouter.route('/:user_id').get(userAuth, getAllMealPlans)
mealPlansRouter
	.route('/:user_id/:mealPlanName')
	.get(userAuth, getMealPlansByName)
	.patch(userAuth, patchMealPlanByName)
	.delete(userAuth, deleteMealPlanByName)

module.exports = mealPlansRouter
