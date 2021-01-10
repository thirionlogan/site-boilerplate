const db = require('./data/db');
const bookshelf = require('bookshelf')(db);

const Shelf = bookshelf.model('Shelf', {
  tableName: 'shelf',
  books() {
    return this.hasMany(Book);
  },
});

const Book = bookshelf.model('Book', {
  tableName: 'book',
  bookshelf() {
    return this.belongsTo(Shelf);
  },
  pages() {
    return this.hasMany(Page);
  },
});

const Page = bookshelf.model('Page', {
  tableName: 'page',
  book() {
    return this.belongsTo(Book);
  },
});

const User = bookshelf.model('User', {
  tableName: 'user',
  authToken() {
    return this.hasOne('AuthToken');
  },
});

module.exports = { User, Page, Book, Shelf };
