const express = require('express');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('../data/db');
const errorHandler = require('../middleware/errorHandler');
const {
  createShelf,
  deleteShelf,
  getAllShelves,
  getShelfById,
  patchShelf,
} = require('../services/shelfService');
const {
  createBook,
  deleteBook,
  getAllBooksFromShelf,
  getBookById,
  patchBook,
} = require('../services/bookService');
const {
  createPage,
  deletePage,
  getAllPagesFromBook,
  getPageById,
  patchPage,
} = require('../services/pageService');
const { createUser, authenticateLogin } = require('../services/userService');

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: 'wow very secret',
    cookie: {
      maxAge: 600000,
      secure: false, //TODO true with https support
    },
    store: new KnexSessionStore({ knex, createtable: false }),
    saveUninitialized: false,
    resave: false,
    unset: 'destroy',
  })
);

app.use(
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
app.use(express.json());
app.use(errorHandler);

const getSomething = () => {
  return Promise.resolve('something');
};

const limitReached = (req, res) => {
  console.warn({ ip: req.ip }, 'Rate limiter triggered');
};
const options = {
  windowMs: 60000,
  max: 5,
  onLimitReached: limitReached,
  handler: limitReached,
};
const rateLimiter = rateLimit(options);

// user
app.post('/register', (req, res) => {
  createUser(req.body)
    .then(({ id }) => {
      res.status(201).location('/login').send();
    })
    .catch((err) => {
      res.status(422).send(err.message);
    });
});

app.post('/login', rateLimiter, (req, res) => {
  authenticateLogin(req.body)
    .then((user) => {
      req.session.user = user;
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(401).send();
    });
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

// Shelf endpoints
app.post('/shelf', (req, res) => {
  createShelf(req.body)
    .then(({ id }) => {
      res.status(201).location(`/shelf/${id}`).send();
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

// Book endpoints
app.get('/shelf/:shelfId/book', (req, res) => {
  getAllBooksFromShelf(req.params.shelfId)
    .then((books) => {
      res.status(200).send(books);
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
app.get('/shelf/:shelfId/book/:bookId', (req, res) => {
  getBookById(req.params.shelfId, req.params.bookId)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
app.post('/shelf/:shelfId/book', (req, res) => {
  const { shelfId } = req.params;
  createBook({ ...req.body, shelf_id: shelfId })
    .then(({ id }) => {
      res.status(201).location(`/shelf/${shelfId}/book/${id}`).send();
    })
    .catch(() => {
      res.status(422).send();
    });
});
app.patch('/shelf/:shelfId/book/:bookId', (req, res) => {
  const { shelfId, bookId } = req.params;
  patchBook(shelfId, bookId, req.body)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
app.delete('/shelf/:shelfId/book/:bookId', (req, res) => {
  const { shelfId, bookId } = req.params;
  deleteBook(shelfId, bookId)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});

// Page endpoints
app.get('/shelf/:shelfId/book/:bookId/page', (req, res) => {
  getAllPagesFromBook(req.params.bookId)
    .then((pages) => {
      res.status(200).send(pages);
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
app.get('/shelf/:shelfId/book/:bookId/page/:pageId', (req, res) => {
  getPageById(req.params.bookId, req.params.pageId)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
app.post('/shelf/:shelfId/book/:bookId/page', (req, res) => {
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
app.patch('/shelf/:shelfId/book/:bookId/page/:pageId', (req, res) => {
  const { bookId, pageId } = req.params;
  patchPage(bookId, pageId, req.body)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});
app.delete('/shelf/:shelfId/book/:bookId/page/:pageId', (req, res) => {
  const { bookId, pageId } = req.params;
  deletePage(bookId, pageId)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(404).send('resource not found');
    });
});

//helpful endpoints

app.get('/', async (req, res) => {
  getSomething().then((something) => {
    res.status(200).send({ message: something });
  });
});

app.use((req, res, next) => {
  res.status(404).send('resource not found');
});

module.exports = app;
