const db = require('../../db/connection');
const format = require('pg-format');

exports.selectUserByUsername = (username) => {
  let queryStr = format(`SELECT * FROM users WHERE username = %L;`, [username]);

  return db.query(queryStr).then((user) => {
    return user.rows;
  });
};

exports.insertUser = (name, username, avatar_url) => {
  let dataArray = [[name, username, avatar_url]];

  if (!name || !username) {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  let queryStr = format(
    `INSERT INTO users (name, username, avatar_url)
  VALUES
  %L
  RETURNING *`,
    dataArray
  );

  return db.query(queryStr).then(({ rows }) => {
    return rows[0];
  });
};

exports.updateUserByUsername = (
  name,
  username,
  avatar_url,
  originalUsername
) => {
  if (/\d/g.test(name)) {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  return db
    .query(
      `UPDATE users 
    SET name = $1, username = $2, avatar_url = $3 
    WHERE username = $4 
    RETURNING *;`,
      [name, username, avatar_url, originalUsername]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.removeUserByUsername = () => {};
