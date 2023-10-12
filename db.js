const { Client } = require("pg");

class DbRunner {
  async init() {
    this.client = new Client({
      host: "database",
      port: 5432,
      database: "appdb",
      user: "dbuser",
      password: "dbpwd",
    });
    return this.client.connect();
  }

  async run(sql) {
    return this.client.query(sql);
    // console.log(res.rows[0].message); // Hello world!
  }

  async close() {
    await this.client.end();
  }
}

function sqlTable(table, columns) {
  return `select ${columns.join(", ")} from ${table}`;
}

const db = new DbRunner();

module.exports = {
  db,
  sqlTable,
};
