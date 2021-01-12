import HomePage from './HomePage';
import { mount } from 'enzyme';
import React from 'react';

describe('HomePage', () => {
  let component;

  describe('when user is logged in', () => {
    beforeEach(() => {
      component = mount(<HomePage user={true} />);
    });
    it('should render', () => {
      expect(component.exists('div')).toBe(true);
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      component = mount(<HomePage user={false} />);
    });
    it('should render', () => {
      expect(component.exists('div')).toBe(true);
    });
  });
});
