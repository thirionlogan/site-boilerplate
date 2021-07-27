import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import React from 'react';

describe('HomePage', () => {
  describe('when user is logged in', () => {
    beforeEach(() => {
      render(<HomePage user={{ id: 1 }} />);
    });
    it('should render', () => {
      expect(screen.getByText(/welcome to home/i)).toBeInTheDocument();
    });
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      render(<HomePage user={{}} />);
    });
    it('should render', () => {
      expect(screen.getByText(/please log in/i)).toBeInTheDocument();
    });
  });
});
