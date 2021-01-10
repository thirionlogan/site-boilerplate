exports.seed = (knex) => {
  return knex('user')
    .del()
    .then(() => {
      return knex('user').insert([
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@email.com',
          password:
            '$2a$10$YSPUaf2rbvPwyxROi7zOaeEQQUM6G1m.1K3dkoJzrGYlAIlilnEre',
        },
      ]);
    });
};
