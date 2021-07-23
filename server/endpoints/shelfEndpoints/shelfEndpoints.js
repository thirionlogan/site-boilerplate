const express = require('express');
const {
  createShelf,
  deleteShelf,
  getAllShelves,
  getShelfById,
  patchShelf,
} = require('../../services/shelfService');

const shelfEndpoints = express.Router();

shelfEndpoints.use(express.json());

shelfEndpoints.post('/shelf', (req, res) => {
  createShelf(req.body)
    .then(({ id }) => {
      res.status(201).location(`/shelf/${id}`).send();
    })
    .catch(() => {
      res.status(422).send();
    });
});
shelfEndpoints.get('/shelf', (req, res) => {
  getAllShelves().then((shelves) => {
    res.status(200).send(shelves);
  });
});
shelfEndpoints.get('/shelf/:id', (req, res) => {
  getShelfById(req.params.id)
    .then((shelf) => {
      res.status(200).send(shelf);
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
shelfEndpoints.patch('/shelf/:id', (req, res) => {
  patchShelf(req.params.id, req.body)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
shelfEndpoints.delete('/shelf/:id', (req, res) => {
  deleteShelf(req.params.id)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});

module.exports = shelfEndpoints;
