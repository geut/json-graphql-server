import { makeExecutableSchema } from 'graphql-tools';
import { printSchema } from 'graphql';
import merge from 'lodash.merge';
import getSchemaFromData from './introspection/getSchemaFromData';
import resolver from './resolver';

export default ({ data, typeDefs, resolvers = {} }) =>
    makeExecutableSchema({
        typeDefs: printSchema(getSchemaFromData(data, typeDefs)),
        resolvers: merge(resolver(data), resolvers),
        logger: { log: e => console.log(e) }, // eslint-disable-line no-console
    });
