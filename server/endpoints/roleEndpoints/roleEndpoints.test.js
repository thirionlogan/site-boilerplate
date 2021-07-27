const express = require('express');
const app = express();
app.use(require('../userEndpoints/userEndpoints'));
app.use(require('./roleEndpoints'));
const db = require('../../data/db');
const { server } = require('../../../src/mocks/server');
const { loginHelper } = require('../../testHelpers');
// TODO use expectDeepObjectOrArrayContaining
describe('Role Endpoints', () => {
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

  describe('GET /role', () => {
    it('should respond with status 200 and send all roles', (done) => {
      const expectedResult = expect.arrayContaining([
        expect.objectContaining({
          name: 'administrator',
          permissions: expect.arrayContaining([
            expect.objectContaining({ name: 'getAllUsers' }),
            expect.objectContaining({ name: 'roleManagement' }),
          ]),
        }),
      ]);

      loginHelper(app, (agent) => {
        agent
          .get('/role')
          .expect(200)
          .end((err, res) => {
            expect(res.body).toEqual(expectedResult);
            err ? done(err) : done();
          });
      });
    });
  });

  describe('PATCH /role/:id/permissions', () => {
    it('should return 204 when removing permissions to role', (done) => {
      const expectedResult = expect.arrayContaining([
        expect.objectContaining({
          name: 'administrator',
          permissions: expect.arrayContaining([
            expect.objectContaining({ name: 'roleManagement' }),
          ]),
        }),
      ]);

      const unexpectedResult = expect.arrayContaining([
        expect.objectContaining({
          name: 'administrator',
          permissions: expect.arrayContaining([
            expect.objectContaining({ name: 'getAllUsers' }),
          ]),
        }),
      ]);

      loginHelper(app, (agent) => {
        agent
          .patch('/role/1/permissions')
          .send({
            permissions: [{ id: 2, name: 'roleManagement' }],
          })
          .expect(204)
          .end((_err, res) => {
            agent
              .get('/role')
              .expect(200)
              .end((error, response) => {
                expect(response.body).toEqual(expectedResult);
                expect(response.body).not.toEqual(unexpectedResult);
                expect(response.body[0].permissions).toHaveLength(1);
                error ? done(error) : done();
              });
          });
      });
    });

    it('should return 204 when adding permissions to role', (done) => {
      const expectedResult = expect.arrayContaining([
        expect.objectContaining({
          name: 'administrator',
          permissions: expect.arrayContaining([
            expect.objectContaining({ name: 'roleManagement' }),
            expect.objectContaining({ name: 'getAllUsers' }),
          ]),
        }),
      ]);

      loginHelper(app, (agent) => {
        agent
          .patch('/role/1/permissions')
          .send({
            permissions: [{ id: 2, name: 'roleManagement' }],
          })
          .expect(204)
          .end(() => {
            agent
              .patch('/role/1/permissions')
              .send({
                permissions: [
                  { id: 1, name: 'getAllUsers' },
                  { id: 2, name: 'roleManagement' },
                ],
              })
              .expect(204)
              .end(() => {
                agent
                  .get('/role')
                  .expect(200)
                  .end((_err, response) => {
                    expect(response.body).toEqual(expectedResult);
                    expect(response.body[0].permissions).toHaveLength(2);
                    _err ? done(_err) : done();
                  });
              });
          });
      });
    });
  });
});
