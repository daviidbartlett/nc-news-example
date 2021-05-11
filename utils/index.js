const convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

const createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

const formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    restOfComment = convertTimestampToDate(restOfComment);
    return { article_id, author: created_by, ...restOfComment };
  });
};

const validateSortBy = (sort_by, columns) => {
  const isValidSortByColumn = columns.includes(sort_by);
  return isValidSortByColumn
    ? sort_by
    : Promise.reject({ status: 400, msg: 'Invalid sort by query' });
};

const validateOrder = (order) => {
  const lowerCaseOrder = order.toLowerCase();
  const isValidOrder = ['asc', 'desc'].includes(lowerCaseOrder);
  return isValidOrder
    ? lowerCaseOrder
    : Promise.reject({ status: 400, msg: 'Invalid order query' });
};

module.exports = {
  convertTimestampToDate,
  createRef,
  formatComments,
  validateSortBy,
  validateOrder,
};
