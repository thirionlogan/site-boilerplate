require('dotenv').config({ path: '../.env' });

const path = require('path');
const migrations = path.resolve(__dirname, './data/migrations');
const seeds = path.resolve(__dirname, './data/seeds');
const filename = path.join(__dirname, './snack_fund_db.sqlite');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: filename,
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrations,
    },
    seeds: { directory: seeds },
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations: {
      directory: './server/data/migrations',
    },
    seeds: { directory: './server/data/seeds' },
  },
  staging: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
  production: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
