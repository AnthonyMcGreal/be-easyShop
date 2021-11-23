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

  let formattedData = [[name, unit_of_measurement, storage_type, username]];
  let queryStr = format(
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
exports.updateIngredientById = (
  ingredient_id,
  name,
  unit_of_measurement,
  storage_type,
  username
) => {
  return db
    .query(
      `UPDATE ingredients 
      SET name = $2, unit_of_measurement = $3, storage_type = $4, username = $5
      WHERE ingredient_id = $1
      RETURNING *;`,
      [ingredient_id, name, unit_of_measurement, storage_type, username]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeIngredientById = () => {};
