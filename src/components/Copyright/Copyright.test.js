import React from 'react';
import Copyright from './Copyright';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Copyright', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Copyright />
      </MemoryRouter>
    );
  });
  it('should render', () => {
    expect(screen.getByText(/copyright © \d+\./i));
    expect(
      screen.getByRole('link', { name: /site boilerplate/i })
    ).toHaveAttribute('href', '/');
  });
});
