const express = require('express');
const cors = require('cors');
const errorHandler = require('../middleware/errorHandler');
const { Shelf, Book, Page } = require('../models');

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

const getSomething = () => {
  return Promise.resolve('something');
};

app.get('/', async (req, res) => {
  getSomething().then((something) => {
    res.status(200).send({ message: something });
  });
});

module.exports = app;
