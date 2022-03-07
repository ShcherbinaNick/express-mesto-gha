const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;

module.exports.handleError = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      res.status(BAD_REQUEST_ERROR).send({ message: `${err.name}: ${err.message}` });
      break;
    case 'CastError':
      res.status(NOT_FOUND_ERROR).send({ message: `${err.name}: ${err.message}` });
      break;
    default:
      res.status(DEFAULT_ERROR).send({ message: `${err.name} - проблема с сервером` });
      break;
  }
};

module.exports = {
  BAD_REQUEST_ERROR, NOT_FOUND_ERROR, DEFAULT_ERROR,
};
