const express = require('express');
const app = express();
app.use(require('./bookEndpoints'));
const request = require('supertest')(app);
const db = require('../../data/db');
const { server } = require('../../../src/mocks/server');

describe('Book Endpoints', () => {
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

  describe('/shelf/:id/book', () => {
    describe('GET /shelf/:shelfId/book', () => {
      const matcher = expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          title: 'The Hobbit',
          author: 'J. R. R. Tolkien',
          date_published: '21 September 1937',
          shelf_id: 1,
        }),
      ]);
      it('should respond with 200 (OK), list of books from a shelf.', async () => {
        const response = await request.get('/shelf/1/book');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(matcher);
      });
      it('should respond with 404 (Not Found), if Shelf ID not found or invalid.', async () => {
        const response = await request.get('/shelf/100/book');
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('resource not found');
      });
    });

    describe('POST /shelf/:id/book', () => {
      it("should respond with 201 and 'Location' header with link to /shelf/{shelfId}/book/{bookId} containing new Book ID.", async () => {
        let response = await request.post('/shelf/1/book').send({
          title: 'The Lord of the Rings',
          author: 'J. R. R. Tolkien',
          date_published: '29 July 1954',
        });
        expect(response.statusCode).toBe(201);
        expect(response.headers.location).toBe('/shelf/1/book/2');

        response = await request.get('/shelf/1/book/2');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
          id: 2,
          title: 'The Lord of the Rings',
          author: 'J. R. R. Tolkien',
          date_published: '29 July 1954',
          pages: [],
        });
      });

      it('should respond with 422 (Unprocessable Entity), if book is not valid', async () => {
        const response = await request.post('/shelf/1/book').send();
        expect(response.statusCode).toBe(422);
      });
    });

    describe('POST /shelf/:id/book', () => {
      it('should respond with 422 and when invalid book is sent', async () => {
        const response = await request.post('/shelf/100/book').send({});
        expect(response.statusCode).toBe(422);
      });

      it('should respond with 422 (Unprocessable Entity), if book is not valid', async () => {
        const response = await request.post('/shelf/1/book').send();
        expect(response.statusCode).toBe(422);
      });
    });

    describe('GET /shelf/:shelfId/book/:bookId', () => {
      const matcher = expect.objectContaining({
        id: 1,
        title: 'The Hobbit',
        author: 'J. R. R. Tolkien',
        date_published: '21 September 1937',
        shelf_id: 1,
        pages: expect.arrayContaining([
          expect.objectContaining({
            content:
              'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
            book_id: 1,
          }),
        ]),
      });
      it('should respond with 200 (OK), book from shelf.', async () => {
        const response = await request.get('/shelf/1/book/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(matcher);
      });

      it('should respond with 404 (Not Found), if Book ID not found or invalid.', async () => {
        const response = await request.get('/shelf/1/book/100');
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('resource not found');
      });
    });

    describe('PATCH /shelf/:id/book/:id', () => {
      it('should respond with 204 (No Content)', async () => {
        let response = await request.patch('/shelf/1/book/2').send({
          title: 'The Fellowship of the Ring',
        });
        expect(response.statusCode).toBe(204);

        response = await request.get('/shelf/1/book/2');
        expect(response.body).toMatchObject({
          id: 2,
          title: 'The Fellowship of the Ring',
          author: 'J. R. R. Tolkien',
          date_published: '29 July 1954',
          pages: [],
        });
      });
      it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
        const response = await request.patch('/shelf/1/book/100').send({
          title: 'no applicable',
        });
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('resource not found');
      });
    });

    describe('DELETE /shelf/:id/book/:id', () => {
      it('should respond with 200 (OK).', async () => {
        let response = await request.delete('/shelf/1/book/2');
        expect(response.statusCode).toBe(200);
        // book should be gone
        response = await request.get('/shelf/1/book/2');
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('resource not found');
      });
      it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
        const response = await request.delete('/shelf/1/book/100');
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('resource not found');
      });
    });
  });
});
