const express = require('express');
const { getAllPermissions } = require('../../services/permissionService');
const authenticationRequired = require('../../middleware/authenticationRequired/authenticationRequired');

const permissionEndpoints = express.Router();

permissionEndpoints.use(express.json());

permissionEndpoints.get('/permission', authenticationRequired, (req, res) => {
  getAllPermissions()
    .then((permissions) => res.status(200).send(permissions))
    .catch(() => res.status(500).send());
});

module.exports = permissionEndpoints;
