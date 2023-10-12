var graphql = require("graphql");

const { schema } = require("./schema");

async function run(source) {
  return graphql.graphql({
    schema,
    source,
  });
}

test("execute queries against graphql schema", async () => {
  const res = await run(
    `query {
        helloworld
      }`
  );
  expect(res.data.helloworld).toBe("Hello World!");
});

test("resolve users", async () => {
  const res = await run(
    `query {
        users {
          id
          name
        }
      }`
  );
  console.log(JSON.stringify(res, null, 2));
});

test("resolve posts", async () => {
  const res = await run(
    `query {
        posts {
          id
          title
        }
      }`
  );
  console.log(JSON.stringify(res, null, 2));
});
