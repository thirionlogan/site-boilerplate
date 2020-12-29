const client = require('./client');

const mockClient = Object.fromEntries(
  Object.entries(client).map(([clientFunctionName, clientFunction]) => {
    return [
      `mock${
        clientFunctionName.charAt(0).toUpperCase() + clientFunctionName.slice(1)
      }`,
      jest.fn(clientFunction),
    ];
  })
);

module.exports = mockClient;
