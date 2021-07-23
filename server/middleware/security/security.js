const express = require('express');
const corsSecurity = require('./corsSecurity');
const sessionManagment = require('./sessionManagement');
const contentSecurityPolicy = require('./contentSecurityPolicy');

const security = express.Router();

security.use(contentSecurityPolicy);
security.use(sessionManagment);
security.use(corsSecurity);

module.exports = security;
