const axios = require('axios').default;

const client = {
  getSomething: () => axios().get('http://localhost:3001/'),
  createShelf: (shelf) => axios().post('http://localhost:3001/shelf', shelf),
  getAllShelves: () => axios.get('http://localhost:3001/shelf'),
  getShelfById: (id) => axios.get(`http://localhost:3001/shelf/${id}`),
  patchShelf: (id, shelf) =>
    axios.patch(`http://localhost:3001/shelf/${id}`, shelf),
  deleteShelf: (id) => axios.delete(`http://localhost:3001/shelf/${id}`),
  getAllBooksFromShelf: (shelfId) =>
    axios.get(`http://localhost:3001/shelf/${shelfId}/book`),
  getBookById: (shelfId, bookId) =>
    axios.get(`http://localhost:3001/shelf/${shelfId}/book/${bookId}`),
  createBook: (shelfId, book) =>
    axios.post(`http://localhost:3001/shelf/${shelfId}/book`, book),
  patchBook: (shelfId, bookId, book) =>
    axios.patch(`http://localhost:3001/shelf/${shelfId}/book/${bookId}`, book),
  deleteBook: (shelfId, bookId) =>
    axios.delete(`http://localhost:3001/shelf/${shelfId}/book/${bookId}`),
  getAllPagesFromBook: (shelfId, bookId) =>
    axios.get(`http://localhost:3001/shelf/${shelfId}/book/${bookId}/page`),
  getPage: (shelfId, bookId, pageId) =>
    axios.get(
      `http://localhost:3001/shelf/${shelfId}/book/${bookId}/page/${pageId}`
    ),
  createPage: (shelfId, bookId, page) =>
    axios.post(
      `http://localhost:3001/shelf/${shelfId}/book/${bookId}/page`,
      page
    ),
  patchPage: (shelfId, bookId, pageId, page) =>
    axios.patch(
      `http://localhost:3001/shelf/${shelfId}/book/${bookId}/page/${pageId}`,
      page
    ),
  deletePage: (shelfId, bookId, pageId) =>
    axios.delete(
      `http://localhost:3001/shelf/${shelfId}/book/${bookId}/page/${pageId}`
    ),
  registerUser: ({ email, firstName, lastName, password, confirmPassword }) =>
    axios.post(`http://localhost:3001/register`, {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    }),
  logInClient: ({ email, password }) =>
    axios.post(`http://localhost:3001/login`, { email, password }),
};
module.exports = client;
