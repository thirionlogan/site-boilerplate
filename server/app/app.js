const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const getSomething = () => {
  return Promise.resolve('something');
};

app.get('/', async (req, res) => {
  getSomething().then((something) => {
    res.status(200).send({ message: something });
  });
});

module.exports = app;
