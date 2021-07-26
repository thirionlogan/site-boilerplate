import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
describe('PrivateRoute', () => {
  let component;

  const setup = (user) =>
    mount(
      <MemoryRouter initialEntries={['/privateComponent']}>
        <PrivateRoute path="/privateComponent" user={user}>
          <div id="private-component" />
        </PrivateRoute>
        <Route exact path="/login" />
      </MemoryRouter>
    );

  describe('When user is logged in', () => {
    beforeEach(() => {
      component = setup({ id: 1 });
    });
    it('should render', () => {
      expect(component.exists('#private-component')).toBe(true);
    });
  });
  describe('When user is not logged in', () => {
    beforeEach(() => {
      component = setup({});
    });
    it('should render', () => {
      expect(component.exists('#private-component')).toBe(false);
    });
  });
});
