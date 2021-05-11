const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/topics');
const { withErrorHandling, methodNotAllowed } = require('../errors');

topicsRouter
  .route('/')
  .get(withErrorHandling(getTopics))
  .all(methodNotAllowed);

module.exports = topicsRouter;
