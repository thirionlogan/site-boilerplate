const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const security = require('../middleware/security/security');
const errorHandler = require('../middleware/errorHandler/errorHandler');
const authenticationRequired = require('../middleware/authenticationRequired/authenticationRequired');
const shelfEndpoints = require('../endpoints/shelfEndpoints/shelfEndpoints');
const bookEndpoints = require('../endpoints/bookEndpoints/bookEndpoints');
const pageEndpoints = require('../endpoints/pageEndpoints/pageEndpoints');
const userEndpoints = require('../endpoints/userEndpoints/userEndpoints');
const { getAllRoles, patchRolePermission } = require('../services/roleService');
const { getAllPermissions } = require('../services/permissionService');

const app = express();

nunjucks.configure('build', {
  autoescape: true,
  express: app,
});

app.use(security);
app.use(express.json());
app.use(errorHandler);

app.use('/static', express.static(path.resolve('./build/static')));
app.use(
  '/asset-manifest.json',
  express.static(path.resolve('./build/asset-manifest.json'))
);
app.use('/robots.txt', express.static(path.resolve('./build/robots.txt')));

// app.get('/', (req, res) => {
//   res.render('index.html', {
//     styleNonce: res.locals.styleNonce,
//   });
// });

app.use(userEndpoints);
// Roles

app.get('/role', authenticationRequired, (req, res) => {
  getAllRoles()
    .then((roles) => res.status(200).send(roles))
    .catch((e) => {
      console.error(e);
      res.status(500).send();
    });
});

app.patch('/role/:id/permissions', authenticationRequired, (req, res) => {
  patchRolePermission(req.params.id, req.body.permissions)
    .then(() => res.status(204).send())
    .catch(() => res.status(500).send());
});

// Permissions

app.get('/permission', authenticationRequired, (req, res) => {
  getAllPermissions()
    .then((permissions) => res.status(200).send(permissions))
    .catch(() => res.status(500).send());
});

app.use(shelfEndpoints);
app.use(bookEndpoints);
app.use(pageEndpoints);

app.use((req, res, next) => {
  res.status(404).send('resource not found');
});

module.exports = app;
