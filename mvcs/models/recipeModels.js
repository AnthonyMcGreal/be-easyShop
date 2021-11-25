const db = require('../../db/connection');
const format = require('pg-format');

exports.selectAllRecipes = () => {
  let queryStr = `SELECT DISTINCT recipe_name FROM recipes;`;

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};
exports.selectRecipeById = (name) => {
  let queryStr = format(
    `SELECT recipes.recipe_name, recipes.link, ingredients.name, recipes.ingredient_quantity, ingredients.unit_of_measurement, recipes.portions, ingredients.storage_type FROM recipes
  JOIN ingredients
  ON recipes.ingredients = ingredients.ingredient_id
  WHERE recipe_name = %L`,
    [name]
  );

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};
exports.insertRecipe = () => {};
exports.updateRecipeById = () => {};
exports.removeRecipeById = () => {};
