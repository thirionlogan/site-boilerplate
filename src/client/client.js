const client = {
  getSomething: () =>
    fetch('http://localhost:3001/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  createShelf: (shelf) =>
    fetch('http://localhost:3001/shelf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: shelf,
    }),
  getAllShelves: () =>
    fetch('http://localhost:3001/shelf', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  getShelfById: (id) =>
    fetch(`http://localhost:3001/shelf/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  patchShelf: (id, shelf) =>
    fetch(`http://localhost:3001/shelf/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: shelf,
    }),
  deleteShelf: (id) =>
    fetch(`http://localhost:3001/shelf/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  getAllBooksFromShelf: (shelfId) =>
    fetch(`http://localhost:3001/shelf/${shelfId}/book`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  getBookById: (shelfId, bookId) =>
    fetch(`http://localhost:3001/shelf/${shelfId}/book/${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  createBook: (shelfId, book) =>
    fetch(`http://localhost:3001/shelf/${shelfId}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: book,
    }),
  patchBook: (shelfId, bookId, book) =>
    fetch(`http://localhost:3001/shelf/${shelfId}/book/${bookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: book,
    }),
  deleteBook: (shelfId, bookId) =>
    fetch(`http://localhost:3001/shelf/${shelfId}/book/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  getAllPagesFromBook: (shelfId, bookId) =>
    fetch(`http://localhost:3001/shelf/${shelfId}/book/${bookId}/page`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  getPage: (shelfId, bookId, pageId) =>
    fetch(
      `http://localhost:3001/shelf/${shelfId}/book/${bookId}/page/${pageId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
  createPage: (shelfId, bookId, page) =>
    fetch(`http://localhost:3001/shelf/${shelfId}/book/${bookId}/page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: page,
    }),
  patchPage: (shelfId, bookId, pageId, page) =>
    fetch(
      `http://localhost:3001/shelf/${shelfId}/book/${bookId}/page/${pageId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: page,
      }
    ),
  deletePage: (shelfId, bookId, pageId) =>
    fetch(
      `http://localhost:3001/shelf/${shelfId}/book/${bookId}/page/${pageId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
};
module.exports = client;
