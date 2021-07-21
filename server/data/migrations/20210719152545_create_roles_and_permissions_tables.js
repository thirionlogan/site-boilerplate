exports.up = (knex) => {
  return knex.schema
    .createTable('role', (table) => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('permission', (table) => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('role_permission', (table) => {
      table.integer('role_id').unsigned().references('role.id');
      table.integer('permission_id').unsigned().references('permission.id');
    })
    .createTable('role_user', (table) => {
      table.integer('user_id').unsigned().references('user.id');
      table.integer('role_id').unsigned().references('role.id');
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('role_user')
    .dropTableIfExists('role_permission')
    .dropTableIfExists('permission')
    .dropTableIfExists('role');
};
