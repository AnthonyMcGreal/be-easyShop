const db = require('../../db/connection');
const format = require('pg-format');

exports.selectAllRecipes = () => {
  let queryStr = `SELECT DISTINCT name FROM recipes;`;

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};
exports.selectRecipeById = () => {};
exports.insertRecipe = () => {};
exports.updateRecipeById = () => {};
exports.removeRecipeById = () => {};
