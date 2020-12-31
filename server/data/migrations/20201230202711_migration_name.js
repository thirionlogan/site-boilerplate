exports.up = (knex) => {
  return knex.schema
    .createTable('shelf', (table) => {
      table.increments();
      table.string('name');
      table.timestamps();
    })
    .createTable('book', (table) => {
      table.increments();
      table.string('title');
      table.string('author');
      table.date('date_published');
      table.integer('shelf_id').references('shelf.id').onDelete('CASCADE');
      table.timestamps();
    })
    .createTable('page', (table) => {
      table.increments();
      table.text('content');
      table.integer('book_id').references('book.id').onDelete('CASCADE');
      table.timestamps();
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('page')
    .dropTableIfExists('book')
    .dropTableIfExists('bookshelf');
};
