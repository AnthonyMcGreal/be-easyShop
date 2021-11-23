const db = require('../../db/connection');
const format = require('pg-format');

exports.selectAllIngredients = () => {
  let queryStr = `SELECT * FROM ingredients;`;

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.insertIngredient = (
  name,
  unit_of_measurement,
  storage_type,
  username
) => {
  if (!name || !unit_of_measurement || !storage_type || !username) {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }

  const formattedData = [[name, unit_of_measurement, storage_type, username]];
  const queryStr = format(
    `INSERT INTO ingredients
        (name, unit_of_measurement, storage_type, username)
        VALUES
        %L
        RETURNING *;`,
    formattedData
  );
  return db.query(queryStr).then(({ rows }) => {
    return rows[0];
  });
};
exports.updateIngredientById = () => {};
exports.removeIngredientById = () => {};
