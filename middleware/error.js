function error(err, req, res, next) {
  res.status(500).send({ error: "An error occurred", err });
}

module.exports = error;
