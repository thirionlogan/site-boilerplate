const express = require('express');
const cors = require('cors');

const corsSecurity = express.Router();

corsSecurity.use(express.json());

corsSecurity.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3001',
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  })
);

module.exports = corsSecurity;
