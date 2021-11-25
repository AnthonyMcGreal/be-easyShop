const {
  selectAllRecipes,
  selectRecipeById,
} = require('../models/recipeModels');

exports.getAllRecipes = (req, res, next) => {
  selectAllRecipes().then((recipes) => {
    res.status(200).send({ recipes });
  });
};

exports.getRecipeById = (req, res, next) => {
  const { name } = req.params;
  selectRecipeById(name).then((recipe) => {
    if (recipe.length === 0) {
      res.status(404).send({ msg: 'Not Found' });
    } else {
      res.status(200).send(recipe);
    }
  });
};

exports.postRecipe = () => {};
exports.patchRecipeById = () => {};
exports.deleteRecipeById = () => {};
