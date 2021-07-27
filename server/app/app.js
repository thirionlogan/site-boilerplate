const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const security = require('../middleware/security/security');
const errorHandler = require('../middleware/errorHandler/errorHandler');
const shelfEndpoints = require('../endpoints/shelfEndpoints/shelfEndpoints');
const bookEndpoints = require('../endpoints/bookEndpoints/bookEndpoints');
const pageEndpoints = require('../endpoints/pageEndpoints/pageEndpoints');
const userEndpoints = require('../endpoints/userEndpoints/userEndpoints');
const roleEndpoints = require('../endpoints/roleEndpoints/roleEndpoints');
const permissionEndpoints = require('../endpoints/permissionEndpoints/permissionEndpoints');

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
app.use(roleEndpoints);
app.use(permissionEndpoints);
app.use(shelfEndpoints);
app.use(bookEndpoints);
app.use(pageEndpoints);

app.use((req, res, next) => {
  res.status(404).send('resource not found');
});

module.exports = app;
