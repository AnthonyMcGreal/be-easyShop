const {
  getAllMealPlans,
  getMealPlansByName,
  postMealPlans,
  patchMealPlanByName,
  deleteMealPlanByName,
} = require('../controllers/mealPlansController');

const mealPlansRouter = require('express').Router();

mealPlansRouter.route('/').get(getAllMealPlans).post(postMealPlans);
mealPlansRouter
  .route('/:mealPlanName')
  .get(getMealPlansByName)
  .patch(patchMealPlanByName)
  .delete(deleteMealPlanByName);

module.exports = mealPlansRouter;
