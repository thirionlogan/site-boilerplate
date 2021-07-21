exports.seed = (knex) => {
  return knex('user')
    .del()
    .then(() => knex('role').del())
    .then(() => knex('permission').del())
    .then(() => knex('role_permission').del())
    .then(() => knex('role_user').del())
    .then(() =>
      knex('user').insert({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password:
          '$2a$10$YSPUaf2rbvPwyxROi7zOaeEQQUM6G1m.1K3dkoJzrGYlAIlilnEre',
      })
    )
    .then(([userId]) =>
      knex('role')
        .insert({ name: 'administrator' })
        .then(([roleId]) =>
          Promise.all(
            [
              { name: 'getAllUsers' },
              { name: 'roleManagement' },
            ].map((permission) => knex('permission').insert(permission))
          )
            .then((permissionIds) =>
              knex('role_permission').insert(
                permissionIds.map(([permissionId]) => ({
                  role_id: roleId,
                  permission_id: permissionId,
                }))
              )
            )
            .then(() =>
              knex('role_user').insert({ user_id: userId, role_id: roleId })
            )
        )
    );
};
