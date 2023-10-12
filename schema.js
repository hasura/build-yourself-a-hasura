var graphql = require("graphql");

var userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    posts: { type: new graphql.GraphQLList(postType) },
  }),
});

var postType = new graphql.GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    user_id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    body: { type: graphql.GraphQLString },
    user: { type: userType },
  }),
});

var queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: new graphql.GraphQLList(userType),
      resolve: (_, { id }) => {
        return { id: 1, name: "test" };
      },
    },
    posts: {
      type: new graphql.GraphQLList(postType),
      resolve: (_, { id }) => {
        return null;
      },
    },
    helloworld: {
      type: graphql.GraphQLString,
      resolve: () => {
        console.log("## RESOLVE");
        return "Hello World!";
      },
    },
  },
});

var schema = new graphql.GraphQLSchema({ query: queryType, resolve: () => {} });

exports.schema = schema;
