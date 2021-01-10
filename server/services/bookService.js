const { Book } = require('../models');

const createBook = ({ title, author, date_published, shelf_id }) => {
  return new Book({ title, author, date_published, shelf_id }).save(null, {
    require: true,
    method: 'insert',
  });
};

const deleteBook = (shelf_id, id) => {
  return new Book({ id, shelf_id }).destroy({ require: true });
};

const getAllBooksFromShelf = (shelf_id) => {
  return Book.where({ shelf_id }).fetchAll({
    require: true,
  });
};

const getBookById = (shelf_id, id) => {
  return Book.where({ id, shelf_id }).fetch({
    withRelated: ['pages'],
    require: true,
  });
};

const patchBook = (shelf_id, id, { title, author, date_published }) => {
  return new Book({ id, shelf_id }).save(
    { title, author, date_published },
    {
      require: true,
      method: 'update',
      patch: true,
    }
  );
};

module.exports = {
  createBook,
  deleteBook,
  getAllBooksFromShelf,
  getBookById,
  patchBook,
};
