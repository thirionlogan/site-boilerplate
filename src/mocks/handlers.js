import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3001/', (req, res, ctx) => {
    return res(ctx.json({}), ctx.status(200));
  }),
];
