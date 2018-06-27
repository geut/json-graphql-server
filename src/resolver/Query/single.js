module.exports = (entityData = []) => (_, { id }) =>
  entityData.find(d => d.id == id);
