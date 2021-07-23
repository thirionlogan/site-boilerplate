const express = require('express');
const {
  createBook,
  deleteBook,
  getAllBooksFromShelf,
  getBookById,
  patchBook,
} = require('../../services/bookService');

const bookEndpoints = express.Router();

bookEndpoints.use(express.json());

bookEndpoints.get('/shelf/:shelfId/book', (req, res) => {
  getAllBooksFromShelf(req.params.shelfId)
    .then((books) => {
      res.status(200).send(books);
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
bookEndpoints.get('/shelf/:shelfId/book/:bookId', (req, res) => {
  getBookById(req.params.shelfId, req.params.bookId)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
bookEndpoints.post('/shelf/:shelfId/book', (req, res) => {
  const { shelfId } = req.params;
  createBook({ ...req.body, shelf_id: shelfId })
    .then(({ id }) => {
      res.status(201).location(`/shelf/${shelfId}/book/${id}`).send();
    })
    .catch(() => {
      res.status(422).send();
    });
});
bookEndpoints.patch('/shelf/:shelfId/book/:bookId', (req, res) => {
  const { shelfId, bookId } = req.params;
  patchBook(shelfId, bookId, req.body)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
bookEndpoints.delete('/shelf/:shelfId/book/:bookId', (req, res) => {
  const { shelfId, bookId } = req.params;
  deleteBook(shelfId, bookId)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});

module.exports = bookEndpoints;
