/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.integer("postId").nullable();
    table.string("name").nullable();
    table.string("email").nullable();
    table.text("body").nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
