const { selectUserByUsername } = require('../models/userModels');

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  console.log('inside controller');
  selectUserByUsername(username).then((user) => {
    if (user.length === 0) {
      res.status(404).send({ msg: 'Not Found' });
    } else {
      res.status(200).send({ user });
    }
  });
};

exports.postUser = () => {};

exports.patchUserByUsername = () => {};

exports.deleteUserByUsername = () => {};
