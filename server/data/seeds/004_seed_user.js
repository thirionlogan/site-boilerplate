exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('user').insert([
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@email.com',
          password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=',
        },
      ]);
    });
};
