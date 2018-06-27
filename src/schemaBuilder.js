const { makeExecutableSchema } = require('graphql-tools');
const { printSchema } = require('graphql');
const merge = require('lodash.merge');
const getSchemaFromData = require('./introspection/getSchemaFromData');
const resolver = require('./resolver');

module.exports = ({ data, typeDefs, resolvers = {} }) =>
  makeExecutableSchema({
    typeDefs: printSchema(getSchemaFromData(data, typeDefs)),
    resolvers: merge(resolver(data), resolvers),
    logger: { log: e => console.log(e) } // eslint-disable-line no-console
  });
