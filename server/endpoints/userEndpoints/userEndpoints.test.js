const express = require('express');
const app = express();
app.use(require('./userEndpoints'));
const request = require('supertest')(app);
const db = require('../../data/db');
const { server } = require('../../../src/mocks/server');
const {
  loginHelper,
  expectDeepObjectOrArrayContaining,
} = require('../../testHelpers');

describe('User Endpoints', () => {
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

  describe('POST /register', () => {
    it('should respond with 201 when the user is registered', async () => {
      const response = await request.post('/register').send({
        email: 'janedoe@email.com',
        firstName: 'Jane',
        lastName: 'Doe',
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(response.statusCode).toBe(201);
      expect(response.headers.location).toBe('/login');
    });

    it('should respond with 422 when the user already exists', async () => {
      const response = await request.post('/register').send({
        email: 'johndoe@email.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(response.statusCode).toBe(422);
      expect(response.text).toBe('User is already registered');
    });

    it("should respond with 422 when the pass and confirm don't match", async () => {
      const response = await request.post('/register').send({
        email: 'janedoe@email.com',
        firstName: 'Jane',
        lastName: 'Doe',
        password: 'password123',
        confirmPassword: 'password321',
      });
      expect(response.statusCode).toBe(422);
      expect(response.text).toBe('Password does not match');
    });
  });

  describe('POST /login', () => {
    it('should respond with 200 (OK) with successful login', async () => {
      const response = await request.post('/login').send({
        email: 'johndoe@email.com',
        password: 'password',
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        email: 'johndoe@email.com',
        firstName: 'John',
        lastName: 'Doe',
      });
    });

    it('should respond with 401 (Unauthorized) with unsuccessful login', async () => {
      const response = await request.post('/login').send({
        email: 'johndoe@email.com',
        password: 'wrong password',
      });
      expect(response.statusCode).toBe(401);
      expect(response.headers['set-cookie']).not.toBeDefined();
      expect(response.text).toBe('Password does not match');
    });
  });

  describe('POST /logout', () => {
    it('should respond with a 200 when user is logged out', async () => {
      const response = await request.post('/logout');
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('OK');
    });
  });

  describe('When the user is logged in', () => {
    it('should get all users', (done) => {
      // const expectedResult = expect.arrayContaining([
      //   expect.objectContaining({
      //     firstName: 'John',
      //     lastName: 'Doe',
      //     email: 'johndoe@email.com',
      //   }),
      //   expect.objectContaining({
      //     firstName: 'Jane',
      //     lastName: 'Doe',
      //     email: 'janedoe@email.com',
      //   }),
      // ]);

      const expectedResult = expectDeepObjectOrArrayContaining([
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@email.com',
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'janedoe@email.com',
        },
      ]);

      loginHelper(app, (agent) => {
        agent
          .get('/user')
          .expect(200)
          .end((error, response) => {
            expect(response.body).toEqual(expectedResult);
            error ? done(error) : done();
          });
      });
    });

    it("should remove user's roles", (done) => {
      loginHelper(app, (agent) => {
        agent
          .patch('/user/1/roles')
          .send({ roles: [] })
          .expect(204)
          .end(() => {
            agent
              .get('/user')
              .expect(200)
              .end((err, res) => {
                expect(res.body[0].roles).toHaveLength(0);
                err ? done(err) : done();
              });
          });
      });
    });

    it("should add a user's role", (done) => {
      // const expectedResult = expect.arrayContaining([
      //   expect.objectContaining({
      //     roles: [expect.arrayContaining(['administrator'])],
      //   }),
      // ]);

      const expectedResult = expectDeepObjectOrArrayContaining([
        { roles: [{ name: 'administrator' }] },
      ]);

      loginHelper(app, (agent) => {
        agent
          .patch('/user/2/roles')
          .send({
            roles: [{ id: 1, name: 'administrator' }],
          })
          .expect(204)
          .end(() => {
            agent
              .get('/user')
              .expect(200)
              .end((err, res) => {
                expect(res.body).toEqual(expectedResult);
                expect(res.body[1].roles).toHaveLength(1);
                err ? done(err) : done();
              });
          });
      });
    });
  });
});
