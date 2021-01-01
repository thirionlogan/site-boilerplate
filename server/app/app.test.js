const request = require('supertest');
const app = require('./app');
const db = require('../data/db');

describe('Endpoints', () => {
  describe('GET /', () => {
    it('should respond with something', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({ message: 'something' });
    });
  });

  describe('404', () => {
    it('should respond with 404', async () => {
      const response = await request(app).get('/doesNotExist');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('resource not found');
    });
  });

  describe('Database endpoints', () => {
    beforeAll(async () => {
      await db.migrate.latest().then(() => {
        return db.seed.run();
      });
    });

    afterAll(async () => {
      await db.migrate.rollback();
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
          const response = await request(app).get('/shelf');
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual(matcher);
        });
      });

      describe('POST /shelf', () => {
        it("should respond with 201 and 'Location' header with link to /shelf/{id} containing new ID.", async () => {
          let response = await request(app)
            .post('/shelf')
            .send({ name: "Bob's Shelf" });
          expect(response.headers.location).toBe('/shelf/2');
          expect(response.statusCode).toBe(201);

          response = await request(app).get('/shelf/2');
          expect(response.statusCode).toBe(200);
          expect(response.body).toMatchObject({ id: 2, name: "Bob's Shelf" });
        });

        it('should respond with 422 (Unprocessable Entity), if shelf is not valid', async () => {
          const response = await request(app).post('/shelf').send();
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
          const response = await request(app).get('/shelf/1');
          expect(response.statusCode).toBe(200);
          expect(response.body).toMatchObject(shelf);
        });
        it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
          const response = await request(app).get('/shelf/100');
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
          let response = await request(app).patch('/shelf/1').send({
            name: "Bob's shelf",
          });
          expect(response.statusCode).toBe(204);

          response = await request(app).get('/shelf/1');
          expect(response.body).toMatchObject(modifiedShelf);
        });
        it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
          const response = await request(app).patch('/shelf/100').send({
            name: "Bob's shelf",
          });
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
      });
      describe('DELETE /shelf/:id', () => {
        it('should respond with 200 (OK).', async () => {
          let response = await request(app).delete('/shelf/1');
          expect(response.statusCode).toBe(200);
          // shelf should be gone
          response = await request(app).get('/shelf/1');
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
        it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
          const response = await request(app).delete('/shelf/100');
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
      });
    });
  });
});
