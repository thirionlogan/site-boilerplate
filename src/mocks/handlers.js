import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3001/', (req, res, ctx) => {
    return res(ctx.json({ message: 'something' }), ctx.status(200));
  }),
  rest.get('http://localhost:3001/shelf', (req, res, ctx) => {
    return res(
      ctx.json([
        {
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
        },
      ]),
      ctx.status(200)
    );
  }),
  rest.get('http://localhost:3001/shelf/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: req.params.id,
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
      }),
      ctx.status(200)
    );
  }),
  rest.post('http://localhost:3001/shelf', (req, res, ctx) => {
    return res(
      ctx.set('location', 'http://localhost:3001/shelf/2'),
      ctx.status(201)
    );
  }),
  rest.patch('http://localhost:3001/shelf/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
  rest.delete('http://localhost:3001/shelf/:id', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get('http://localhost:3001/shelf/:shelfId/book', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: 'The Hobbit',
          author: 'J. R. R. Tolkien',
          date_published: '21 September 1937',
          shelf_id: req.params.shelfId,
        },
      ]),
      ctx.status(200)
    );
  }),
  rest.get(
    'http://localhost:3001/shelf/:shelfId/book/:bookId',
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: req.params.bookId,
          title: 'The Hobbit',
          author: 'J. R. R. Tolkien',
          date_published: '21 September 1937',
          shelf_id: req.params.shelfId,
          pages: [
            {
              id: 1,
              content:
                'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
              book_id: req.params.bookId,
            },
          ],
        }),
        ctx.status(200)
      );
    }
  ),
  rest.post('http://localhost:3001/shelf/:shelfId/book', (req, res, ctx) => {
    return res(
      ctx.set(
        'location',
        `http://localhost:3001/shelf/${req.params.shelfId}/book/2`
      ),
      ctx.status(201)
    );
  }),
  rest.patch(
    'http://localhost:3001/shelf/:shelfId/book/:bookId',
    (req, res, ctx) => {
      return res(ctx.status(204));
    }
  ),
  rest.delete(
    'http://localhost:3001/shelf/:shelfId/book/:bookId',
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.get(
    'http://localhost:3001/shelf/:shelfId/book/:bookId/page',
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 1,
            content:
              'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
            book_id: req.params.bookId,
          },
        ]),
        ctx.status(200)
      );
    }
  ),
  rest.get(
    'http://localhost:3001/shelf/:shelfId/book/:bookId/:bookId/page/:pageId',
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: req.params.pageId,
          content:
            'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
          book_id: req.params.bookId,
        }),
        ctx.status(200)
      );
    }
  ),
  rest.post(
    'http://localhost:3001/shelf/:shelfId/book/:bookId/page',
    (req, res, ctx) => {
      return res(
        ctx.set(
          'location',
          `http://localhost:3001/shelf/${req.params.shelfId}/book/${req.params.bookId}/page/2`
        ),
        ctx.status(201)
      );
    }
  ),
  rest.patch(
    'http://localhost:3001/shelf/:shelfId/book/:bookId/:bookId/page/:pageId',
    (req, res, ctx) => {
      return res(ctx.status(204));
    }
  ),
  rest.delete(
    'http://localhost:3001/shelf/:shelfId/book/:bookId/page/:pageId',
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.post('http://localhost:3001/register', (req, res, ctx) => {
    return res(
      ctx.set('location', 'http://localhost:3001/login'),
      ctx.status(201)
    );
  }),
  rest.post('http://localhost:3001/login', (req, res, ctx) => {
    return res(
      ctx.json({
        email: 'johndoe@email.com',
        firstName: 'John',
        lastName: 'Doe',
      }),
      ctx.status(200)
    );
  }),
  rest.post('http://localhost:3001/logout', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
