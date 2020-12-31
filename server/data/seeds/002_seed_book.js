exports.seed = (knex) => {
  return knex('book')
    .del()
    .then(() => {
      return knex('book').insert([
        {
          title: 'The Hobbit',
          author: 'J. R. R. Tolkien',
          date_published: '21 September 1937',
          shelf_id: 1,
        },
      ]);
    });
};
