# Site Boilerplate

[![Build](https://img.shields.io/github/workflow/status/thirionlogan/site-boilerplate/CI)](https://github.com/thirionlogan/site-boilerplate/actions)
[![Open Issues](https://img.shields.io/github/issues/thirionlogan/site-boilerplate)](https://github.com/thirionlogan/site-boilerplate/issues)
[![Bugs](https://img.shields.io/github/issues/thirionlogan/site-boilerplate/bug)](https://github.com/thirionlogan/site-boilerplate/issues?q=is%3Aissue+is%3Aopen+label%3Abug+)
[![Closed Issues](https://img.shields.io/github/issues-closed/thirionlogan/site-boilerplate)](https://github.com/thirionlogan/site-boilerplate/issues?q=is%3Aissue+is%3Aclosed)
[![Pull Requests](https://img.shields.io/github/issues-pr/thirionlogan/site-boilerplate)](https://github.com/thirionlogan/site-boilerplate/pulls)
[![MIT License](https://img.shields.io/github/license/thirionlogan/site-boilerplate)](https://github.com/thirionlogan/site-boilerplate/blob/main/LICENSE)

This is a boilerplate for quickly standing up a node/express/react site with some basic features conducive to agile development.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Setup

Here is some information relating to what you need as setup

### Environment Variables

create a file called .env in the root directory and put this into it:

```
DB_HOST=localhost
DB_USER=postgres
DB_NAME=
DB_PASS=
```

### Postgres server commands cheatsheet

- Windows:
  - start: `pg_ctl -D "C:\Program Files\PostgreSQL\13\data" start`
  - stop: `pg_ctl -D "C:\Program Files\PostgreSQL\13\data" stop`
  - restart: `pg_ctl -D "C:\Program Files\PostgreSQL\13\data" restart`
- Mac:
  - start: `pg_ctl -D /usr/local/var/postgres start`
  - stop: `pg_ctl -D /usr/local/var/postgres stop`
