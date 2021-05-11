const format = require('pg-format');
const db = require('../db/connection');
const { checkExists } = require('./utils');

exports.selectComments = async ({
  article_id,
  sort_by = 'created_at',
  order = 'desc',
}) => {
  const isValidSortByColumn = ['created_at', 'votes'].includes(sort_by);
  const lowerCaseOrder = order.toLowerCase();
  const isValidOrder = ['asc', 'desc'].includes(lowerCaseOrder);

  if (!isValidSortByColumn)
    return Promise.reject({ status: 400, msg: 'Invalid sort by query' });
  if (!isValidOrder)
    return Promise.reject({ status: 400, msg: 'Invalid order query' });

  const queryStr = `SELECT * FROM comments WHERE article_id = $1 ORDER BY ${sort_by}
  ${order};`;

  const comments = await db
    .query(queryStr, [article_id])
    .then((result) => result.rows);

  if (!comments.length) {
    await checkExists('articles', 'article_id', article_id);
  }
  return comments;
};

exports.insertComment = async ({ article_id, author, body }) => {
  const comment = await db
    .query(
      'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;',
      [article_id, author, body]
    )
    .then((result) => result.rows[0]);
  return comment;
};

exports.updateCommentById = async (comment_id, { inc_votes = 0 }) => {
  const comment = await db
    .query(
      `UPDATE comments
      SET votes = votes + $1
      WHERE comment_id = $2
      RETURNING *;`,
      [inc_votes, comment_id]
    )
    .then((result) => result.rows[0]);

  if (!comment) {
    return Promise.reject({ status: 404, msg: 'comment not found' });
  }
  return comment;
};

exports.removeCommentById = async (comment_id) => {
  const numberOfDeletions = await db
    .query(`DELETE FROM comments WHERE comment_id = $1;`, [comment_id])
    .then((result) => result.rowCount);

  if (!numberOfDeletions) {
    return Promise.reject({ status: 404, msg: 'comment not found' });
  }
};
