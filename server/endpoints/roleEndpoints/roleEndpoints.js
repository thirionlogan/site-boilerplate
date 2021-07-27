const express = require('express');
const {
  getAllRoles,
  patchRolePermission,
} = require('../../services/roleService');
const authenticationRequired = require('../../middleware/authenticationRequired/authenticationRequired');

const roleEndpoints = express.Router();

roleEndpoints.use(express.json());

roleEndpoints.get('/role', authenticationRequired, (req, res) => {
  getAllRoles()
    .then((roles) => res.status(200).send(roles))
    .catch((e) => {
      console.error(e);
      res.status(500).send();
    });
});

roleEndpoints.patch(
  '/role/:id/permissions',
  authenticationRequired,
  (req, res) => {
    patchRolePermission(req.params.id, req.body.permissions)
      .then(() => res.status(204).send())
      .catch(() => res.status(500).send());
  }
);

module.exports = roleEndpoints;
