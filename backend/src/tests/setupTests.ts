import knex from "knex";
import config from "../../knexfile"; // Adjust the path as necessary

const db = knex(config.test);

// Create tables for testing
const setupDatabase = async () => {
  await db.schema.dropTableIfExists("posts"); // Clean up before creating
  await db.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.text("body");
    table.string("email");
    table.string("name");
    table.timestamps(true, true);
  });
};

// Export the setup function and the database instance
export { setupDatabase, db };
