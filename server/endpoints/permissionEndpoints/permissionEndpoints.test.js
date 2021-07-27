const express = require('express');
const app = express();
app.use(require('../userEndpoints/userEndpoints'));
app.use(require('./permissionEndpoints'));
const db = require('../../data/db');
const { server } = require('../../../src/mocks/server');
const {
  loginHelper,
  expectDeepObjectOrArrayContaining,
} = require('../../testHelpers');

describe('Permission Endpoints', () => {
  beforeAll(async () => {
    server.close();
    await db.migrate.latest().then(() => {
      return db.seed.run();
    });
  });
  afterAll(async () => {
    await db.migrate.rollback();
    server.listen();
  });

  describe('GET /permission', () => {
    it('should respond with status 200 and send all permissions', (done) => {
      const expectedResult = expectDeepObjectOrArrayContaining([
        { name: 'getAllUsers' },
        { name: 'roleManagement' },
      ]);

      loginHelper(app, (agent) => {
        agent
          .get('/permission')
          .expect(200)
          .end((err, res) => {
            expect(res.body).toEqual(expectedResult);
            err ? done(err) : done();
          });
      });
    });
  });
});
