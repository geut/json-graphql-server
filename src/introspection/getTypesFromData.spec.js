const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
const getTypesFromData = require('./getTypesFromData');

test('Integration test', () => {
  const data = {
    posts: [
      {
        id: 1,
        title: 'Lorem Ipsum',
        views: 254,
        user_id: 123
      },
      {
        id: 2,
        title: 'Sic Dolor amet',
        views: 65,
        user_id: 456
      }
    ],
    users: [
      {
        id: 123,
        name: 'John Doe'
      },
      {
        id: 456,
        name: 'Jane Doe'
      }
    ]
  };
  const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      views: { type: new GraphQLNonNull(GraphQLInt) },
      user_id: { type: new GraphQLNonNull(GraphQLID) }
    }
  });
  const UsersType = new GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) }
    }
  });
  expect(getTypesFromData(data)).toEqual([PostType, UsersType]);
});
