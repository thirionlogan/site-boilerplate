const authenticationRequired = require('./authenticationRequired');

describe('middleware.AuthenticationRequired', () => {
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
      sendStatus(status) {
        this.code = status;
        if (status === 401) this.data = 'Unauthorized';
        return this;
      },
    };

    next.mockClear();
  });

  it('should continue if authenticated', () => {
    authenticationRequired(
      { ...req, session: { user: { firstName: 'Joe' } } },
      res,
      next
    );

    expect(res.code).toBeNull();

    expect(res.data).toBeNull();

    expect(next).toBeCalled();
  });

  it('should send 401 if not authenticated', () => {
    authenticationRequired(req, res, next);

    expect(res.code).toBeDefined();
    expect(res.code).toBe(401);

    expect(res.data).toBeDefined();
    expect(res.data).toBe('Unauthorized');
  });
});
