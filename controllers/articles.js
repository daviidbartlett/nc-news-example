const {
  selectArticles,
  countArticles,
  selectArticleById,
  updateArticleById,
} = require('../models/articles');

exports.getArticles = async (req, res) => {
  const articles = await selectArticles(req.query);
  const total_count = await countArticles(req.query);
  res.send({ articles, total_count });
};

exports.getArticleById = async (req, res) => {
  const { article_id } = req.params;
  const article = await selectArticleById(article_id);
  res.send({ article });
};

exports.patchArticleById = async (req, res) => {
  const { article_id } = req.params;
  const article = await updateArticleById(article_id, req.body);
  res.send({ article });
};
