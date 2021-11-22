const db = require('../../db/connection');
const format = require('pg-format');

exports.selectUserByUsername = (username) => {
  let queryStr = format(`SELECT * FROM users WHERE username = %L;`, [username]);

  return db.query(queryStr).then((user) => {
    return user.rows;
  });
};

exports.addUser = () => {};

exports.updateUserByUsername = () => {};

exports.removeUserByUsername = () => {};
