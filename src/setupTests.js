import Enzyme from 'enzyme';
// TODO: add official enzyme adapter for react 17 when that comes out
// `import Adapter from 'enzyme-adapter-react-17';`
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
