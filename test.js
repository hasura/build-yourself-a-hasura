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
