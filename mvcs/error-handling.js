exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send();
};
