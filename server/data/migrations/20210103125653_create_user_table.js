exports.up = (knex) => {
  return knex.schema
    .createTable('user', (table) => {
      table.increments();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();
      table.text('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('auth_token', (table) => {
      table.text('token').notNullable().unique();
      table.integer('user_id').references('user.id').onDelete('CASCADE');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('auth_token').dropTableIfExists('user');
};
