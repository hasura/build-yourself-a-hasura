const { Client } = require("pg");

async function run() {
  const client = new Client({
    host: "database",
    port: 5432,
    database: "appdb",
    user: "dbuser",
    password: "dbpwd",
  });
  await client.connect();

  const res = await client.query("SELECT $1::text as message", [
    "Hello world!",
  ]);
  console.log(res.rows[0].message); // Hello world!
  await client.end();
}

run();
