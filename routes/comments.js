const commentsRouter = require('express').Router();
const { patchCommentById, deleteComment } = require('../controllers/comments');
const { withErrorHandling, methodNotAllowed } = require('../errors');

commentsRouter
  .route('/:comment_id')
  .patch(withErrorHandling(patchCommentById))
  .delete(withErrorHandling(deleteComment))
  .all(methodNotAllowed);

module.exports = commentsRouter;
