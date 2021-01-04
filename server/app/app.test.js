const request = require('supertest');
const app = require('./app');
const db = require('../data/db');
const { server } = require('../../src/mocks/server');

describe('Endpoints', () => {
  beforeAll(() => {
    server.close();
  });
  afterAll(() => {
    server.listen();
  });
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

    describe('POST /register', () => {
      it('should respond with 201 when the user is registered', async () => {
        const response = await request(app).post('/register').send({
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
        const response = await request(app).post('/register').send({
          email: 'johndoe@email.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'password123',
          confirmPassword: 'password123',
        });
        expect(response.statusCode).toBe(422);
      });

      it("should respond with 422 when the pass and confirm don't match", async () => {
        const response = await request(app).post('/register').send({
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
      it('should respond with 200 (OK) and cookie with successful login', async () => {
        const response = await request(app).post('/login').send({
          email: 'johndoe@email.com',
          password: 'password',
        });
        expect(response.statusCode).toBe(200);
        expect(response.headers['set-cookie'][0]).toContain('AuthToken');
      });
      it('should respond with 401 (Unauthorized) with unsuccessful login', async () => {
        const response = await request(app).post('/login').send({
          email: 'johndoe@email.com',
          password: 'wrong password',
        });
        expect(response.statusCode).toBe(401);
        expect(response.headers['set-cookie']).not.toBeDefined();
      });
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
          const response = await request(app).get('/shelf/1/book');
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual(matcher);
        });
        it('should respond with 404 (Not Found), if Shelf ID not found or invalid.', async () => {
          const response = await request(app).get('/shelf/100/book');
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
      });

      describe('POST /shelf/:id/book', () => {
        it("should respond with 201 and 'Location' header with link to /shelf/{shelfId}/book/{bookId} containing new Book ID.", async () => {
          let response = await request(app).post('/shelf/1/book').send({
            title: 'The Lord of the Rings',
            author: 'J. R. R. Tolkien',
            date_published: '29 July 1954',
          });
          expect(response.headers.location).toBe('/shelf/1/book/2');
          expect(response.statusCode).toBe(201);

          response = await request(app).get('/shelf/1/book/2');
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
          const response = await request(app).post('/shelf/1/book').send();
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
          const response = await request(app).get('/shelf/1/book/1');
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual(matcher);
        });

        it('should respond with 404 (Not Found), if Book ID not found or invalid.', async () => {
          const response = await request(app).get('/shelf/1/book/100');
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
      });

      describe('PATCH /shelf/:id/book/:id', () => {
        it('should respond with 204 (No Content)', async () => {
          let response = await request(app).patch('/shelf/1/book/2').send({
            title: 'The Fellowship of the Ring',
          });
          expect(response.statusCode).toBe(204);

          response = await request(app).get('/shelf/1/book/2');
          expect(response.body).toMatchObject({
            id: 2,
            title: 'The Fellowship of the Ring',
            author: 'J. R. R. Tolkien',
            date_published: '29 July 1954',
            pages: [],
          });
        });
        it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
          const response = await request(app).patch('/shelf/1/book/100').send({
            title: 'no applicable',
          });
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
      });

      describe('DELETE /shelf/:id/book/:id', () => {
        it('should respond with 200 (OK).', async () => {
          let response = await request(app).delete('/shelf/1/book/2');
          expect(response.statusCode).toBe(200);
          // book should be gone
          response = await request(app).get('/shelf/1/book/2');
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
        it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
          const response = await request(app).delete('/shelf/1/book/100');
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
      });
    });

    describe('/shelf/:id/book/:id/page', () => {
      describe('GET /shelf/:shelfId/book/:bookId/page', () => {
        const matcher = expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            content:
              'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
            book_id: 1,
          }),
        ]);
        it('should respond with 200 (OK), list of pages from a book.', async () => {
          const response = await request(app).get('/shelf/1/book/1/page');
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual(matcher);
        });
        it('should respond with 404 (Not Found), if Shelf ID not found or invalid.', async () => {
          const response = await request(app).get('/shelf/1/book/100/page');
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
      });

      describe('POST /shelf/:id/book', () => {
        const pageContent =
          'It had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle. The door opened on to a tube-shaped hall like a tunnel: a very comfortable tunnel without smoke, with panelled walls, and floors tiled and carpeted, provided with polished chairs, and lots and lots of pegs for hats and coats - the hobbit was fond of visitors. The tunnel wound on and on, going fairly but not quite straight into the side of the hill - The Hill, as all the people for many miles round called it - and many little round doors opened out of it, first on one side and then on another. No going upstairs for the hobbit: bedrooms, bathrooms, cellars, pantries (lots of these), wardrobes (he had whole rooms devoted to clothes), kitchens, dining-rooms, all were on the same floor, and indeed on the same passage. The best rooms were all on the left-hand side (going in), for these were the only ones to have windows, deep-set round windows looking over his garden and meadows beyond, sloping down to the river.';
        it("should respond with 201 and 'Location' header with link to /shelf/{shelfId}/book/{bookId} containing new Book ID.", async () => {
          let response = await request(app).post('/shelf/1/book/1/page').send({
            content: pageContent,
          });
          expect(response.headers.location).toBe('/shelf/1/book/1/page/2');
          expect(response.statusCode).toBe(201);

          response = await request(app).get('/shelf/1/book/1/page/2');
          expect(response.statusCode).toBe(200);
          expect(response.body).toMatchObject({
            id: 2,
            content: pageContent,
            book_id: 1,
          });
        });

        it('should respond with 422 (Unprocessable Entity), if book is not valid', async () => {
          const response = await request(app)
            .post('/shelf/1/book/1/page')
            .send();
          expect(response.statusCode).toBe(422);
        });
      });

      describe('GET /shelf/:shelfId/book/:bookId/page/:pageId', () => {
        const matcher = expect.objectContaining({
          id: 1,
          content:
            'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
          book_id: 1,
        });
        it('should respond with 200 (OK), list of books from a shelf.', async () => {
          const response = await request(app).get('/shelf/1/book/1/page/1');
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual(matcher);
        });

        it('should respond with 404 (Not Found), if Book ID not found or invalid.', async () => {
          const response = await request(app).get('/shelf/1/book/1/page/100');
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
      });

      describe('PATCH /shelf/:shelfId/book/:bookId/page/:pageId', () => {
        it('should respond with 204 (No Content)', async () => {
          let response = await request(app)
            .patch('/shelf/1/book/1/page/2')
            .send({
              content: 'This second page will be deleted',
            });
          expect(response.statusCode).toBe(204);

          response = await request(app).get('/shelf/1/book/1/page/2');
          expect(response.body).toMatchObject({
            id: 2,
            content: 'This second page will be deleted',
            book_id: 1,
          });
        });
        it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
          const response = await request(app)
            .patch('/shelf/1/book/1/page/100')
            .send({
              content: 'no applicable',
            });
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
      });

      describe('DELETE /shelf/:shelfId/book/:bookId/page/:pageId', () => {
        it('should respond with 200 (OK).', async () => {
          let response = await request(app).delete('/shelf/1/book/1/page/2');
          expect(response.statusCode).toBe(200);
          // book should be gone
          response = await request(app).get('/shelf/1/book/1/page/2');
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
        it('should respond with 404 (Not Found), if ID not found or invalid.', async () => {
          const response = await request(app).delete(
            '/shelf/1/book/1/page/100'
          );
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe('resource not found');
        });
      });
    });
  });
});
