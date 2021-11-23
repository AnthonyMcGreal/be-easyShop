const {
  getAllIngredients,
  postIngredient,
  patchIngredientsById,
  deleteIngredientsById,
} = require('../controllers/ingredientsController');

const ingredientsRouter = require('express').Router();

ingredientsRouter.route('/').get(getAllIngredients).post(postIngredient);
ingredientsRouter
  .route('/:ingredient_id')
  .patch(patchIngredientsById)
  .delete(deleteIngredientsById);

module.exports = ingredientsRouter;
