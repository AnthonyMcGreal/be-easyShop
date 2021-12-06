const {
  selectAllRecipes,
  selectRecipeById,
  insertRecipe,
  removeRecipeByName,
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

exports.postRecipe = async (req, res, next) => {
  const { body } = req;
  insertRecipe(body)
    .then((response) => {
      selectAllRecipes().then((recipes) => {
        res.status(201).send({ recipes });
      });
    })
    .catch(next);
};

exports.deleteRecipeByName = (req, res, next) => {
  const { name } = req.params;
  removeRecipeByName(name).then((recipe) => {
    if (recipe.rows.length === 0) {
      res.status(404).send({ msg: 'Not Found' });
    } else {
      res.sendStatus(204);
    }
  });
};
