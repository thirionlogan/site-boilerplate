const app = require('./app');
const request = require('supertest')(app);
const { server } = require('../../src/mocks/server');

describe('Endpoints', () => {
  beforeAll(() => {
    server.close();
  });
  afterAll(() => {
    server.listen();
  });

  // describe('GET /', () => {
  //   it('should respond with a 200 and some html', async () => {
  //     const response = await request.get('/');
  //     expect(response.statusCode).toBe(200);
  //     expect(response.text).toContain('<!doctype html>');
  //   });
  // });

  describe('404', () => {
    it('should respond with 404', async () => {
      const response = await request.get('/doesNotExist');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('resource not found');
    });
  });
});
