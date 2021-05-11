const usersRouter = require('express').Router();
const { getUser } = require('../controllers/users');
const { withErrorHandling, methodNotAllowed } = require('../errors');

usersRouter
  .route('/:username')
  .get(withErrorHandling(getUser))
  .all(methodNotAllowed);

module.exports = usersRouter;
