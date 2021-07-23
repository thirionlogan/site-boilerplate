const express = require('express');
const permissionRequired = require('../../middleware/permissionRequired/permissionRequired');
const authenticationRequired = require('../../middleware/authenticationRequired/authenticationRequired');
const rateLimiter = require('../../middleware/rateLimiter');
const sessionManagement = require('../../middleware/security/sessionManagement');
const {
  createUser,
  authenticateLogin,
  getAllUsers,
} = require('../../services/userService');
const { patchUserRole } = require('../../services/roleService');

const userEndpoints = express.Router();

userEndpoints.use(express.json());
userEndpoints.use(sessionManagement);

userEndpoints.post('/register', (req, res) => {
  createUser(req.body)
    .then(({ id }) => {
      res.status(201).location('/login').send();
    })
    .catch((err) => {
      res.status(422).send(err.message);
    });
});

userEndpoints.post('/login', rateLimiter, (req, res) => {
  authenticateLogin(req.body)
    .then((user) => {
      req.session.user = user;
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(401).send();
    });
});

userEndpoints.post('/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

userEndpoints.get(
  '/user',
  authenticationRequired,
  permissionRequired('getAllUsers'),
  (req, res) => {
    getAllUsers()
      .then((users) => res.status(200).send(users))
      .catch(() => res.status(500).send());
  }
);

userEndpoints.patch('/user/:id/roles', (req, res) => {
  patchUserRole(req.params.id, req.body.roles)
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => res.status(500).send());
});

module.exports = userEndpoints;
