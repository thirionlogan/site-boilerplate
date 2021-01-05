exports.up = (knex) => {
  return knex.schema
    .createTable('shelf', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('book', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.string('author').notNullable();
      table.date('date_published').notNullable();
      table.integer('shelf_id').references('shelf.id').onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('page', (table) => {
      table.increments();
      table.text('content').notNullable();
      table.integer('book_id').references('book.id').onDelete('CASCADE');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('page')
    .dropTableIfExists('book')
    .dropTableIfExists('shelf');
};
