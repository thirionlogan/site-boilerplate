exports.seed = (knex) => {
  return knex('user')
    .del()
    .then(() => {
      return knex('user').insert([
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@email.com',
          password:
            '$2a$10$YSPUaf2rbvPwyxROi7zOaeEQQUM6G1m.1K3dkoJzrGYlAIlilnEre',
        },
      ]);
    });
};
//XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=
