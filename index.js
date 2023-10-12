var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var graphql = require("graphql");

// Maps id to User object
var fakeDatabase = {
  a: {
    id: "a",
    name: "alice",
  },
  b: {
    id: "b",
    name: "bob",
  },
};

// Define the User type
var userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    posts: { type: graphql.GraphQLList(postType) },
  },
});

var postType = new graphql.GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: graphql.GraphQLInt },
    user_id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    body: { type: graphql.GraphQLString },
    user: { type: userType },
  },
});

// Define the Query type
var queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: new graphql.GraphQLList(userType),
      resolve: (_, { id }) => {
        return fakeDatabase[id];
      },
    },
    posts: {
      type: new graphql.GraphQLList(postType),
      resolve: (_, { id }) => {
        return fakeDatabase[id];
      },
    },
  },
});

var schema = new graphql.GraphQLSchema({ query: queryType });

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(3000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
