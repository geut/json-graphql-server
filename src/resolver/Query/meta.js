const applyFilters = require('./applyFilters');

module.exports = entityData => (_, { filter = {} }) => {
  let items = applyFilters(entityData, filter);

  return { count: items.length };
};
