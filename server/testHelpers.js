const supertest = require('supertest');

const expectDeepObjectOrArrayContaining = (arrayOrObject) => {
  if (Array.isArray(arrayOrObject)) {
    return expect.arrayContaining(
      arrayOrObject.map(expectDeepObjectOrArrayContaining)
    );
  } else if (typeof arrayOrObject === 'object') {
    return expect.objectContaining(
      Object.fromEntries(
        Object.entries(arrayOrObject).map(([key, value]) => [
          key,
          expectDeepObjectOrArrayContaining(value),
        ])
      )
    );
  }
  return arrayOrObject;
};

// This requires app to use user endpoints before it is passed into this function
const loginHelper = (app, callback) => {
  const agent = supertest.agent(app);
  agent
    .post('/login')
    .send({
      email: 'johndoe@email.com',
      password: 'password',
    })
    .expect(200)
    .end((err, res) => {
      expect(err).toBe(null);
      callback(agent);
    });
};

module.exports = {
  loginHelper,
  expectDeepObjectOrArrayContaining,
};
