const db = require('../../db/connection');
const format = require('pg-format');

exports.selectMiscItemById = (miscItem_id) => {
  if (/[a-z]/gi.test(miscItem_id)) {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }

  const queryStr = format(`SELECT * FROM miscItems WHERE item_id = %L;`, [
    miscItem_id,
  ]);

  return db.query(queryStr).then((user) => {
    return user.rows;
  });
};

exports.insertMiscItem = () => {};
exports.updateMiscItemById = () => {};
exports.removeMiscItemById = () => {};
