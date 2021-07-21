/* eslint-disable camelcase */
const { Permission } = require('../models');

const getAllPermissions = () => Permission.fetchAll({ require: true });

// const createPermission = () => {return Permission.};
// const deletePermission = () => {return Permission.};

module.exports = {
  getAllPermissions,
  //   createPermission,
  //   deletePermission,
};
