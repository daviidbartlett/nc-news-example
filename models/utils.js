const format = require('pg-format');
const db = require('../db/connection');

exports.checkExists = async (table, column, query) => {
  // SQL INJECTION possible, must not be open to user input
  if (!query) return true;
  const queryStr = format('SELECT * FROM %s WHERE %s = $1;', table, column);
  const rowCount = await db
    .query(queryStr, [query])
    .then((result) => result.rowCount);

  if (!rowCount) {
    const notFound = table[0].toUpperCase() + table.slice(1, -1);
    return Promise.reject({ status: 404, msg: `${notFound} Not Found` });
  }
};
