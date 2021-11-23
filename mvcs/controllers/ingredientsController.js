const { selectAllIngredients } = require('../models/ingredientsModels');

exports.getAllIngredients = (req, res, next) => {
  selectAllIngredients().then((ingredients) => {
    res.status(200).send({ ingredients });
  });
};
exports.postIngredient = () => {};
exports.patchIngredientsById = () => {};
exports.deleteIngredientsById = () => {};
