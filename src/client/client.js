const axios = require('axios').default;
const API_SERVER = process.env.API_SERVER || 'http://localhost:3001';

const instance = axios.create({
  withCredentials: true,
  baseURL: API_SERVER,
});

const client = {
  getSomething: () => instance.get(``),
  createShelf: (shelf) => instance.post(`shelf`, shelf),
  getAllShelves: () => instance.get(`shelf`),
  getShelfById: (id) => instance.get(`shelf/${id}`),
  patchShelf: (id, shelf) => instance.patch(`shelf/${id}`, shelf),
  deleteShelf: (id) => instance.delete(`shelf/${id}`),
  getAllBooksFromShelf: (shelfId) => instance.get(`shelf/${shelfId}/book`),
  getBookById: (shelfId, bookId) =>
    instance.get(`shelf/${shelfId}/book/${bookId}`),
  createBook: (shelfId, book) => instance.post(`shelf/${shelfId}/book`, book),
  patchBook: (shelfId, bookId, book) =>
    instance.patch(`shelf/${shelfId}/book/${bookId}`, book),
  deleteBook: (shelfId, bookId) =>
    instance.delete(`shelf/${shelfId}/book/${bookId}`),
  getAllPagesFromBook: (shelfId, bookId) =>
    instance.get(`shelf/${shelfId}/book/${bookId}/page`),
  getPage: (shelfId, bookId, pageId) =>
    instance.get(`shelf/${shelfId}/book/${bookId}/page/${pageId}`),
  createPage: (shelfId, bookId, page) =>
    instance.post(`shelf/${shelfId}/book/${bookId}/page`, page),
  patchPage: (shelfId, bookId, pageId, page) =>
    instance.patch(`shelf/${shelfId}/book/${bookId}/page/${pageId}`, page),
  deletePage: (shelfId, bookId, pageId) =>
    instance.delete(`shelf/${shelfId}/book/${bookId}/page/${pageId}`),
  registerUser: ({ email, firstName, lastName, password, confirmPassword }) =>
    instance.post(`register`, {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    }),
  logInClient: ({ email, password }) =>
    instance.post(`login`, { email, password }),
  logOutClient: () => instance.post(`logout`),
};
module.exports = client;
