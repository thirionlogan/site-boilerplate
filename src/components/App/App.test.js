import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

it('renders learn react link', () => {
  const component = shallow(<App />);
  expect(component.exists('div')).toBe(true);
});
