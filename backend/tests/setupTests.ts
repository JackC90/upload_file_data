import knex from "knex";
import config from "../knexfile"; // Adjust the path as necessary

const db = knex(config.test);

// Create tables for testing
const setupDatabase = async () => {
  await db.schema.dropTableIfExists("posts");
  await db.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.integer("postId");
    table.string("name");
    table.text("body");
    table.string("email");
    table.timestamps(true, true);
  });
};

// Export the setup function and the database instance
export { setupDatabase, db };
