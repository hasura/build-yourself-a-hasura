const { db, sqlTable } = require("./db");
var graphql = require("graphql");

async function resolve(source, args, context, info) {
  await db.init();
  const table = info.fieldName;
  const columns = info.fieldNodes[0].selectionSet.selections.map(
    (s) => s.name.value
  );
  const sql = await sqlTable(table, columns);

  const res = (await db.run(sql)).rows;
  await db.close();
  return res;
}

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
    title: { type: graphql.GraphQLString },
    body: { type: graphql.GraphQLString },
    user: { type: userType },
  }),
});

var queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: new graphql.GraphQLList(userType),
      resolve,
    },
    posts: {
      type: new graphql.GraphQLList(postType),
      resolve,
    },
    helloworld: {
      type: graphql.GraphQLString,
      resolve: () => {
        return "Hello World!";
      },
    },
  },
});

var schema = new graphql.GraphQLSchema({ query: queryType });

module.exports = { schema };
