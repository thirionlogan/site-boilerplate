exports.seed = (knex) => {
  return knex('page')
    .del()
    .then(() => {
      return knex('page').insert([
        {
          content:
            'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
          book_id: 1,
        },
      ]);
    });
};
