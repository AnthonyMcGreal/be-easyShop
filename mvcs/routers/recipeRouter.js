const {
  getAllRecipes,
  postRecipe,
  getRecipeById,
  patchRecipeById,
  deleteRecipeById,
} = require('../controllers/recipeControllers');

const recipeRouter = require('express').Router();

recipeRouter.route('/').get(getAllRecipes).post(postRecipe);
recipeRouter
  .route('/:recipe_id')
  .get(getRecipeById)
  .patch(patchRecipeById)
  .delete(deleteRecipeById);

module.exports = recipeRouter;
