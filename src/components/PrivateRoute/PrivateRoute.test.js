import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

describe('PrivateRoute', () => {
  const setup = (user) =>
    render(
      <MemoryRouter initialEntries={['/privateComponent']}>
        <PrivateRoute path="/privateComponent" user={user}>
          <p>Private Component</p>
        </PrivateRoute>
        <Route exact path="/login" />
      </MemoryRouter>
    );

  describe('When user is logged in', () => {
    beforeEach(() => {
      setup({ id: 1 });
    });
    it('should render', () => {
      expect(screen.getByText('Private Component')).toBeInTheDocument();
    });
  });
  describe('When user is not logged in', () => {
    beforeEach(() => {
      setup({});
    });
    it('should not render', () => {
      expect(screen.queryByText('Private Component')).not.toBeInTheDocument();
    });
  });
});
