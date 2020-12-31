exports.seed = (knex) => {
  return knex('shelf')
    .del()
    .then(() => {
      return knex('shelf').insert([{ name: 'My Shelf' }]);
    });
};
