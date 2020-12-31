const request = require('supertest');
const app = require('./app');

describe('Endpoints', () => {
  describe('GET /', () => {
    it('should respond with something', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({ message: 'something' });
    });
  });
});
