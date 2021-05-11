exports.withErrorHandling = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (err) {
      next(err);
    }
  };
};

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handleSQLErrors = (err, req, res, next) => {
  const badRequestCodes = ['22P02', '23502', '42601'];
  const notFoundCodes = ['23503'];
  if (badRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad Request' });
  } else if (notFoundCodes.includes(err.code)) {
    res.status(404).send({ msg: 'Not Found' });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
};
