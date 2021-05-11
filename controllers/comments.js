const {
  selectComments,
  insertComment,
  updateCommentById,
  removeCommentById,
} = require('../models/comments');

exports.getComments = async (req, res) => {
  const { order } = req.query;
  const comments = await selectComments({ ...req.params, ...req.query });
  res.send({ comments });
};

exports.postComment = async (req, res) => {
  const { article_id } = req.params;
  const { username: author, body } = req.body;
  const comment = await insertComment({ article_id, author, body });
  res.status(201).send({ comment });
};

exports.patchCommentById = async (req, res) => {
  const { comment_id } = req.params;
  const comment = await updateCommentById(comment_id, req.body);
  res.send({ comment });
};

exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  await removeCommentById(comment_id);
  res.sendStatus(204);
};
