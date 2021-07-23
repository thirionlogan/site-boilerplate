const express = require('express');
const app = express();
app.use(require('./userEndpoints'));
const request = require('supertest')(app);
const db = require('../../data/db');
const { server } = require('../../../src/mocks/server');

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
    });
  });

  describe('POST /logout', () => {
    it('should respond with a 200 when user is logged out', async () => {
      const response = await request.post('/logout');
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('OK');
    });
  });
});
