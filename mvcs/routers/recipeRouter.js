const {
  getAllRecipes,
  postRecipe,
  getRecipeById,
  deleteRecipeByName,
} = require('../controllers/recipeControllers');

const recipeRouter = require('express').Router();

recipeRouter.route('/').get(getAllRecipes).post(postRecipe);
recipeRouter.route('/:name').get(getRecipeById).delete(deleteRecipeByName);

module.exports = recipeRouter;
