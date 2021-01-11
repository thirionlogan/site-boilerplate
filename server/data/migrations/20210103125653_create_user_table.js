exports.up = (knex) => {
  return knex.schema
    .createTable('user', (table) => {
      table.increments();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('email').notNullable().unique();
      table.text('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('sessions', (table) => {
      table.string('sid').notNullable();
      table.json('sess').notNullable();
      table.timestamp('expired').notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('sessions').dropTableIfExists('user');
};
