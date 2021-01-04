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

const AuthToken = bookshelf.model('AuthToken', {
  tableName: 'auth_token',
  user() {
    return this.belongsTo('User');
  },
});

exports.AuthToken = AuthToken;
exports.User = User;
exports.Page = Page;
exports.Book = Book;
exports.Shelf = Shelf;
exports.Bookshelf = bookshelf;
