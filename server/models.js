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
  roles() {
    return this.belongsToMany(Role);
  },
  permissions() {
    return this.belongsToMany(Permission)
      .through(RoleUserPivot, 'user_id')
      .through(Role)
      .through(RolePermissionPivot, 'role_id');
  },
});

const RoleUserPivot = bookshelf.model('RoleUserPivot', {
  tableName: 'role_user',
  role() {
    return this.belongsTo(Role);
  },
  user() {
    return this.belongsTo(User);
  },
});

const Role = bookshelf.model('Role', {
  tableName: 'role',
  users() {
    return this.belongsToMany(User);
  },
  permissions() {
    return this.belongsToMany(Permission, 'role_permission');
  },
});

const RolePermissionPivot = bookshelf.model('RolePermissionPivot', {
  tableName: 'role_permission',
  role() {
    return this.belongsTo(Role);
  },
  permission() {
    return this.belongsTo(Permission);
  },
});

const Permission = bookshelf.model('Permission', {
  tableName: 'permission',
  roles() {
    return this.belongsToMany(Role, 'role_permission');
  },
  user() {
    return this.belongsToMany(User)
      .through(RolePermissionPivot, 'permission_id')
      .through(Role)
      .through(RoleUserPivot, 'role_id');
  },
});

module.exports = { User, Page, Book, Shelf, Role, Permission };
