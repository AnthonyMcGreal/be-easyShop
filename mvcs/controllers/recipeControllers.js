const { selectAllRecipes } = require('../models/recipeModels');

exports.getAllRecipes = (req, res, next) => {
  selectAllRecipes().then((recipes) => {
    res.status(200).send({ recipes });
  });
};

exports.getRecipeById = () => {};
exports.postRecipe = () => {};
exports.patchRecipeById = () => {};
exports.deleteRecipeById = () => {};
