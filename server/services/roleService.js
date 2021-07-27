/* eslint-disable camelcase */
const { Role, User } = require('../models');

const getAllRoles = () =>
  Role.fetchAll({ require: true, withRelated: ['permissions'] });

const patchUserRole = (id, newRoles) =>
  new User({ id }).fetch({ withRelated: ['roles'] }).then((userModel) => {
    const rolesToRemove = userModel
      .related('roles')
      .filter(
        (roleModel) =>
          !newRoles
            .map(({ id: roleId }) => roleId)
            .includes(roleModel.get('id'))
      )
      .map((roleModel) => roleModel.get('id'));
    const rolesToAdd = newRoles
      .filter((roleObject) => {
        return !userModel
          .related('roles')
          .map(({ id: roleId }) => roleId)
          .includes(roleObject.id);
      })
      .map(({ id: roleId }) => roleId);
    userModel.related('roles').attach(rolesToAdd);
    userModel.related('roles').detach(rolesToRemove);
  });

const patchRolePermission = (id, newPermissions) =>
  new Role({ id }).fetch({ withRelated: ['permissions'] }).then((roleModel) => {
    const permissionsToRemove = roleModel
      .related('permissions')
      .filter(
        (permissionModel) =>
          !newPermissions
            .map(({ id: permissionId }) => permissionId)
            .includes(permissionModel.get('id'))
      )
      .map((permissionModel) => permissionModel.get('id'));
    const permissionsToAdd = newPermissions
      .filter((permissionObject) => {
        return !roleModel
          .related('permissions')
          .map(({ id: permissionId }) => permissionId)
          .includes(permissionObject.id);
      })
      .map(({ id: permissionId }) => permissionId);
    roleModel.related('permissions').attach(permissionsToAdd);
    roleModel.related('permissions').detach(permissionsToRemove);
  });

module.exports = {
  getAllRoles,
  patchUserRole,
  patchRolePermission,
};
