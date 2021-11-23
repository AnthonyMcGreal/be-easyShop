const {
  selectAllIngredients,
  insertIngredient,
} = require('../models/ingredientsModels');

exports.getAllIngredients = (req, res, next) => {
  selectAllIngredients().then((ingredients) => {
    res.status(200).send({ ingredients });
  });
};
exports.postIngredient = (req, res, next) => {
  const { name, unit_of_measurement, storage_type, username } = req.body;
  insertIngredient(name, unit_of_measurement, storage_type, username)
    .then((ingredient) => {
      res.status(201).send({ ingredient });
    })
    .catch(next);
};
exports.patchIngredientsById = () => {};
exports.deleteIngredientsById = () => {};
