const { pluralize } = require('inflection');
const GraphQLJSON = require('graphql-type-json');

const all = require('./Query/all');
const meta = require('./Query/meta');
const single = require('./Query/single');
const create = require('./Mutation/create');
const update = require('./Mutation/update');
const remove = require('./Mutation/remove');
const entityResolver = require('./Entity');
const { getTypeFromKey } = require('../nameConverter');
const DateType = require('../introspection/DateType');
const hasType = require('../introspection/hasType');

const getQueryResolvers = (entityName, data) => ({
  [`all${pluralize(entityName)}`]: all(data),
  [`_all${pluralize(entityName)}Meta`]: meta(data),
  [entityName]: single(data)
});

const getMutationResolvers = (entityName, data) => ({
  [`create${entityName}`]: create(data),
  [`update${entityName}`]: update(data),
  [`remove${entityName}`]: remove(data)
});

module.exports = data => {
  return Object.assign(
    {},
    {
      Query: Object.keys(data).reduce(
        (resolvers, key) =>
          Object.assign(
            {},
            resolvers,
            getQueryResolvers(getTypeFromKey(key), data[key])
          ),
        {}
      ),
      Mutation: Object.keys(data).reduce(
        (resolvers, key) =>
          Object.assign(
            {},
            resolvers,
            getMutationResolvers(getTypeFromKey(key), data[key])
          ),
        {}
      )
    },
    Object.keys(data).reduce(
      (resolvers, key) =>
        Object.assign({}, resolvers, {
          [getTypeFromKey(key)]: entityResolver(key, data)
        }),
      {}
    ),
    hasType('Date', data) ? { Date: DateType } : {}, // required because makeExecutableSchema strips resolvers from typeDefs
    hasType('JSON', data) ? { JSON: GraphQLJSON } : {} // required because makeExecutableSchema strips resolvers from typeDefs
  );
};
