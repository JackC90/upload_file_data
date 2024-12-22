require("dotenv").config();

module.exports = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "5442",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "posts",
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
