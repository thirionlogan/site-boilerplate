import { mount } from 'enzyme';
import React from 'react';
import App from './App';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = mount(<App />);
  });

  it('renders', () => {
    expect(component.exists('div')).toBe(true);
  });
});
