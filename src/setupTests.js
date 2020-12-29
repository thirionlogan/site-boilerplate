import { configure } from 'enzyme';
// TODO: add official enzyme adapter for react 17 when that comes out
// `import Adapter from 'enzyme-adapter-react-17';`
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { server } from './mocks/server';

configure({ adapter: new Adapter() });

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
