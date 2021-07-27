import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';
import { MemoryRouter } from 'react-router-dom';
import { mockLogOutClient } from '../../client/mockClient';

// TODO open side drawer

describe('PageHeader', () => {
  const mockHandleSetUser = jest.fn();

  const setup = (user) =>
    render(
      <MemoryRouter>
        <PageHeader
          user={user}
          logOutClient={mockLogOutClient}
          handleSetUser={mockHandleSetUser}
        />
      </MemoryRouter>
    );

  describe('When the user is logged in', () => {
    beforeEach(() => {
      setup({ id: 1 });
    });

    it('should log out', () => {
      const loginButton = screen.queryByRole('button', {
        name: /login/i,
      });

      const accountButton = screen.getByRole('button', {
        name: /account of current user/i,
      });

      fireEvent.click(accountButton);

      const logoutButton = screen.getByRole('menuitem', {
        name: /log out/i,
      });

      fireEvent.click(logoutButton);
      expect(mockLogOutClient).toBeCalled(); // TODO convert to mock service worker
      expect(loginButton).not.toBeInTheDocument();
    });
  });

  describe('When the user is not logged in', () => {
    beforeEach(() => setup({}));

    it('Log in button should exist', () => {
      const loginButton = screen.getByRole('button', {
        name: /login/i,
      });

      const accountButton = screen.queryByRole('button', {
        name: /account of current user/i,
      });

      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveAttribute('href', '/login');
      expect(accountButton).not.toBeInTheDocument();
    });
  });
});
