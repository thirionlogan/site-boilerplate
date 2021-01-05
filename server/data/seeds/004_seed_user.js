exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('user')
        .insert([
          {
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@email.com',
            password:
              '$2a$10$YSPUaf2rbvPwyxROi7zOaeEQQUM6G1m.1K3dkoJzrGYlAIlilnEre',
          },
        ])
        .then(() => {
          return knex('auth_token').insert([
            {
              token:
                'd77f942c51f5f424594c5630be3146f7ac92efe6d9e6b86e63aed4454a05',
              user_id: 1,
            },
          ]);
        });
    });
};
//XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=
