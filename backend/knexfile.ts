import { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5442,
      user: process.env.DB_USER || "user",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "posts",
    },
    migrations: {
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5442,
      user: process.env.DB_USER || "user",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "posts",
    },
    migrations: {
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },
  test: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5452,
      user: "user",
      password: "password",
      database: "test",
    },
    migrations: {
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },
};

export default config;
