const {
  getAllRecipes,
  postRecipe,
  getRecipeById,
  deleteRecipeByName,
  patchRecipeByName,
} = require('../controllers/recipeControllers');

const recipeRouter = require('express').Router();

recipeRouter.route('/').get(getAllRecipes).post(postRecipe);
recipeRouter
  .route('/:name')
  .get(getRecipeById)
  .patch(patchRecipeByName)
  .delete(deleteRecipeByName);

module.exports = recipeRouter;
