const express = require('express');
const cors = require('cors');
const errorHandler = require('../middleware/errorHandler');
const {
  createShelf,
  deleteShelf,
  getAllShelves,
  getShelfById,
  patchShelf,
} = require('../services/shelfService');

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

const getSomething = () => {
  return Promise.resolve('something');
};

app.post('/shelf', (req, res) => {
  createShelf(req.body)
    .then(({ id }) => {
      id ? res.status(201).location(`/shelf/${id}`).send() : res.status(422);
    })
    .catch(() => {
      res.status(422).send();
    });
});

app.get('/shelf', (req, res) => {
  getAllShelves().then((shelves) => {
    res.status(200).send(shelves);
  });
});

app.get('/shelf/:id', (req, res) => {
  getShelfById(req.params.id)
    .then((shelf) => {
      res.status(200).send(shelf);
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});

app.patch('/shelf/:id', (req, res) => {
  patchShelf(req.params.id, req.body)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});

app.delete('/shelf/:id', (req, res) => {
  deleteShelf(req.params.id)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});

app.get('/', async (req, res) => {
  getSomething().then((something) => {
    res.status(200).send({ message: something });
  });
});

app.use((req, res, next) => {
  res.status(404).send('resource not found');
});

module.exports = app;
