exports.up = function(knex) {
  //table creation
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("username", 128)
      .notNullable()
      .unique();
    users.string("password", 128).notNullable();
    users.string('department',128);
  });
};

exports.down = function(knex, Promise) {
  //table rollback
  return knex.schema.dropTableIfExists("users");
};
