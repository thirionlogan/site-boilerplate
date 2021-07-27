import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import LoginPage from './LoginPage';
import { mockLogInClient } from '../../client/mockClient';

describe('LoginPage', () => {
  const mockHandleLogin = jest.fn();
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginPage
          logInClient={(params) => Promise.resolve(mockLogInClient(params))} // TODO icky
          handleLogin={mockHandleLogin}
          user={{}}
        />
      </MemoryRouter>
    );
  });
  const getInputFields = () => ({
    emailBox: screen.getByRole('textbox', { name: /email address/i }),
    passwordBox: screen.getByLabelText(/^password/i),
    signInButton: screen.getByRole('button', { name: /sign in/i }),
    forgotPasswordLink: screen.getByRole('link', {
      name: /forgot password\?/i,
    }),
    signUpLink: screen.getByRole('link', {
      name: /don't have an account\? sign up/i,
    }),
  });

  it('should log in', () => {
    const { emailBox, passwordBox, signInButton } = getInputFields();

    fireEvent.change(emailBox, { target: { value: 'johndoe@email.com' } });
    fireEvent.change(passwordBox, { target: { value: 'password' } });

    fireEvent.click(signInButton);

    expect(mockLogInClient).toBeCalledWith({
      email: 'johndoe@email.com',
      password: 'password',
    });
  });

  it('should require email', () => {
    const { passwordBox, signInButton } = getInputFields();

    fireEvent.change(passwordBox, { target: { value: 'password' } });

    fireEvent.click(signInButton);

    expect(mockLogInClient).not.toBeCalled();
  });

  it('should require password', () => {
    const { emailBox, signInButton } = getInputFields();

    fireEvent.change(emailBox, { target: { value: 'johndoe@email.com' } });

    fireEvent.click(signInButton);

    expect(mockLogInClient).not.toBeCalled();
  });
});
