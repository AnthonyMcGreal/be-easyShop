const {
  getAllMealPlans,
  getMealPlansByName,
  postMealPlans,
  patchMealPlanByName,
} = require('../controllers/mealPlansController');

const mealPlansRouter = require('express').Router();

mealPlansRouter.route('/').get(getAllMealPlans).post(postMealPlans);
mealPlansRouter
  .route('/:mealPlanName')
  .get(getMealPlansByName)
  .patch(patchMealPlanByName);

module.exports = mealPlansRouter;
