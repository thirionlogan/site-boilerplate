/* eslint-disable camelcase */
const { Permission } = require('../models');

const getAllPermissions = () => Permission.fetchAll({ require: true });

module.exports = {
  getAllPermissions,
};
