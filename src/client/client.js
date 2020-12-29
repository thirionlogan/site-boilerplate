const client = {
  getSomething: () =>
    fetch('http://localhost:3001/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
};
module.exports = client;
