const express = require('express');
const app = express();
app.use(require('./shelfEndpoints'));
const request = require('supertest')(app);
const db = require('../../data/db');
const { server } = require('../../../src/mocks/server');

describe('Shelf Endpoints', () => {
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

  describe('/shelf', () => {
    describe('GET /shelf', () => {
      const matcher = expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'My Shelf',
          books: expect.arrayContaining([
            expect.objectContaining({
              id: 1,
              title: 'The Hobbit',
              author: 'J. R. R. Tolkien',
              date_published: '21 September 1937',
              shelf_id: 1,
            }),
          ]),
        }),
      ]);
      it('should respond with 200 (OK), list of shelfs.', async () => {
        const response = await request.get('/shelf');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(matcher);
      });
    });

    describe('POST /shelf', () => {
      it("should respond with 201 and 'Location' header with link to /shelf/{id} containing new ID.", async () => {
        let response = await request
          .post('/shelf')
          .send({ name: "Bob's Shelf" });
        expect(response.headers.location).toBe('/shelf/2');
        expect(response.statusCode).toBe(201);

        response = await request.get('/shelf/2');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({ id: 2, name: "Bob's Shelf" });
      });

      it('should respond with 422 (Unprocessable Entity), if shelf is not valid', async () => {
        const response = await request.post('/shelf').send();
        expect(response.statusCode).toBe(422);
      });
    });

    describe('GET /shelf/:id', () => {
      const shelf = {
        id: 1,
        name: 'My Shelf',
        books: [
          {
            id: 1,
            title: 'The Hobbit',
            author: 'J. R. R. Tolkien',
            date_published: '21 September 1937',
            shelf_id: 1,
          },
        ],
      };
      it('should respond with 200 (OK), a shelf.', async () => {
        const response = await request.get('/shelf/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(shelf);
      });
      it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
        const response = await request.get('/shelf/100');
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('resource not found');
      });
    });
    describe('PATCH /shelf/:id', () => {
      const modifiedShelf = {
        id: 1,
        name: "Bob's shelf",
        books: [
          {
            id: 1,
            title: 'The Hobbit',
            author: 'J. R. R. Tolkien',
            date_published: '21 September 1937',
            shelf_id: 1,
          },
        ],
      };
      it('should respond with 204 (No Content)', async () => {
        let response = await request.patch('/shelf/1').send({
          name: "Bob's shelf",
        });
        expect(response.statusCode).toBe(204);

        response = await request.get('/shelf/1');
        expect(response.body).toMatchObject(modifiedShelf);
      });
      it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
        const response = await request.patch('/shelf/100').send({
          name: "Bob's shelf",
        });
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('resource not found');
      });
    });
    describe('DELETE /shelf/:id', () => {
      it('should respond with 200 (OK).', async () => {
        let response = await request.delete('/shelf/1');
        expect(response.statusCode).toBe(200);
        // shelf should be gone
        response = await request.get('/shelf/1');
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('resource not found');
      });
      it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
        const response = await request.delete('/shelf/100');
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('resource not found');
      });
    });
  });
});
