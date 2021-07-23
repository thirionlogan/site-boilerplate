const express = require('express');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');

const contentSecurityPolicy = express.Router();

contentSecurityPolicy.use((req, res, next) => {
  res.locals.styleNonce = Buffer.from(uuidv4()).toString('base64');
  next();
});

contentSecurityPolicy.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'default-src': ["'self'"],
        'script-src': ["'self'"],
        'style-src': [
          "'self'",
          'fonts.googleapis.com',
          'fonts.gstatic.com',
          (req, res) => `'nonce-${res.locals.styleNonce}'`,
        ],
        'font-src': ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com'],
        'img-src': ["'self'", 'images.squarespace-cdn.com', 'data:'],
      },
    },
  })
);

module.exports = contentSecurityPolicy;
