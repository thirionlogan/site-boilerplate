const express = require('express');
const {
  createPage,
  deletePage,
  getAllPagesFromBook,
  getPageById,
  patchPage,
} = require('../../services/pageService');

const pageEndpoints = express.Router();

pageEndpoints.use(express.json());

pageEndpoints.get('/shelf/:shelfId/book/:bookId/page', (req, res) => {
  getAllPagesFromBook(req.params.bookId)
    .then((pages) => {
      res.status(200).send(pages);
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
pageEndpoints.get('/shelf/:shelfId/book/:bookId/page/:pageId', (req, res) => {
  getPageById(req.params.bookId, req.params.pageId)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
pageEndpoints.post('/shelf/:shelfId/book/:bookId/page', (req, res) => {
  const { shelfId, bookId } = req.params;
  createPage({ ...req.body, book_id: bookId })
    .then(({ id }) => {
      res
        .status(201)
        .location(`/shelf/${shelfId}/book/${bookId}/page/${id}`)
        .send();
    })
    .catch(() => {
      res.status(422).send();
    });
});
pageEndpoints.patch('/shelf/:shelfId/book/:bookId/page/:pageId', (req, res) => {
  const { bookId, pageId } = req.params;
  patchPage(bookId, pageId, req.body)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
pageEndpoints.delete(
  '/shelf/:shelfId/book/:bookId/page/:pageId',
  (req, res) => {
    const { bookId, pageId } = req.params;
    deletePage(bookId, pageId)
      .then(() => {
        res.status(200).send();
      })
      .catch(() => {
        res.status(404).send('resource not found');
      });
  }
);

module.exports = pageEndpoints;
