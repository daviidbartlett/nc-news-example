const { selectUserByUsername } = require('../models/users');

exports.getUser = async (req, res) => {
  const { username } = req.params;
  const user = await selectUserByUsername(username);
  res.send({ user });
};
