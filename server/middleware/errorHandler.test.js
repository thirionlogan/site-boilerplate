const errorHandler = require('./errorHandler');

describe('middleware.ErrorHandler', () => {
  let req;
  let res;
  const next = jest.fn();

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };

    res = {
      data: null,
      code: null,
      status(status) {
        this.code = status;
        return this;
      },
      send(payload) {
        this.data = payload;
      },
    };

    next.mockClear();
  });

  it('should handle error', () => {
    errorHandler(new Error(), req, res, next);

    expect(res.code).toBeDefined();
    expect(res.code).toBe(500);

    expect(res.data).toBeDefined();
    expect(res.data).toBe('Something broke!');
  });
});
