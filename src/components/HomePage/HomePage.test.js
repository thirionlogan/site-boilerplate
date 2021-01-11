import HomePage from './HomePage';
import { mount } from 'enzyme';
import React from 'react';

describe('HomePage', () => {
  let component;
  beforeEach(() => {
    component = mount(<HomePage />);
  });
  it('should render', () => {
    expect(true).toBe(true);
  });
});
