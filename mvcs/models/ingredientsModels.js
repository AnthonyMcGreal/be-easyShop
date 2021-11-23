const db = require('../../db/connection');
const format = require('pg-format');

exports.selectAllIngredients = () => {
  let queryStr = `SELECT * FROM ingredients;`;

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.insertIngredient = () => {};
exports.updateIngredientById = () => {};
exports.removeIngredientById = () => {};
