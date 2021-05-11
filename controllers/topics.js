const { selectTopics } = require('../models/topics');

exports.getTopics = async (req, res) => {
  const topics = await selectTopics();
  return res.send({ topics });
};
