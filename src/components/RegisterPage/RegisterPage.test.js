import React from 'react';
import RegisterPage from './RegisterPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockRegisterUser } from '../../client/mockClient';

describe('RegisterPage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <RegisterPage
          registerUser={(params) => Promise.resolve(mockRegisterUser(params))} // TODO icky
        />
      </MemoryRouter>
    );
  });
  const getInputFields = () => ({
    firstNameBox: screen.getByRole('textbox', { name: /first name/i }),
    lastNameBox: screen.getByRole('textbox', { name: /last name/i }),
    emailBox: screen.getByRole('textbox', { name: /email address/i }),
    passwordBox: screen.getByLabelText(/^password/i),
    confirmPasswordBox: screen.getByLabelText(/confirm password/i),
    signupButton: screen.getByRole('button', { name: /sign up/i }),
  });

  const newUser = {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bobsmith@email.com',
    password: 'password',
  };
  it('should register user', () => {
    const {
      firstNameBox,
      lastNameBox,
      emailBox,
      passwordBox,
      confirmPasswordBox,
      signupButton,
    } = getInputFields();

    fireEvent.change(firstNameBox, { target: { value: newUser.firstName } });
    fireEvent.change(lastNameBox, { target: { value: newUser.lastName } });
    fireEvent.change(emailBox, { target: { value: newUser.email } });
    fireEvent.change(passwordBox, { target: { value: newUser.password } });
    fireEvent.change(confirmPasswordBox, {
      target: { value: newUser.password },
    });

    fireEvent.click(signupButton);

    expect(mockRegisterUser).toBeCalledWith({
      ...newUser,
      confirmPassword: newUser.password,
    });
  });
  it('should require First Name', () => {
    const {
      lastNameBox,
      emailBox,
      passwordBox,
      confirmPasswordBox,
      signupButton,
    } = getInputFields();

    fireEvent.change(lastNameBox, { target: { value: newUser.lastName } });
    fireEvent.change(emailBox, { target: { value: newUser.email } });
    fireEvent.change(passwordBox, { target: { value: newUser.password } });
    fireEvent.change(confirmPasswordBox, {
      target: { value: newUser.password },
    });

    fireEvent.click(signupButton);

    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Last Name', () => {
    const {
      firstNameBox,
      emailBox,
      passwordBox,
      confirmPasswordBox,
      signupButton,
    } = getInputFields();

    fireEvent.change(firstNameBox, { target: { value: newUser.firstName } });
    fireEvent.change(emailBox, { target: { value: newUser.email } });
    fireEvent.change(passwordBox, { target: { value: newUser.password } });
    fireEvent.change(confirmPasswordBox, {
      target: { value: newUser.password },
    });

    fireEvent.click(signupButton);
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Email', () => {
    const {
      firstNameBox,
      lastNameBox,
      passwordBox,
      confirmPasswordBox,
      signupButton,
    } = getInputFields();

    fireEvent.change(firstNameBox, { target: { value: newUser.firstName } });
    fireEvent.change(lastNameBox, { target: { value: newUser.lastName } });
    fireEvent.change(passwordBox, { target: { value: newUser.password } });
    fireEvent.change(confirmPasswordBox, {
      target: { value: newUser.password },
    });

    fireEvent.click(signupButton);
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Password', () => {
    const {
      firstNameBox,
      lastNameBox,
      emailBox,
      confirmPasswordBox,
      signupButton,
    } = getInputFields();

    fireEvent.change(firstNameBox, { target: { value: newUser.firstName } });
    fireEvent.change(lastNameBox, { target: { value: newUser.lastName } });
    fireEvent.change(emailBox, { target: { value: newUser.email } });
    fireEvent.change(confirmPasswordBox, {
      target: { value: newUser.password },
    });

    fireEvent.click(signupButton);
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Confirm Password', () => {
    const {
      firstNameBox,
      lastNameBox,
      emailBox,
      passwordBox,
      signupButton,
    } = getInputFields();

    fireEvent.change(firstNameBox, { target: { value: newUser.firstName } });
    fireEvent.change(lastNameBox, { target: { value: newUser.lastName } });
    fireEvent.change(emailBox, { target: { value: newUser.email } });
    fireEvent.change(passwordBox, { target: { value: newUser.password } });

    fireEvent.click(signupButton);
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Confirm Password to be the same as Password', () => {
    const {
      firstNameBox,
      lastNameBox,
      emailBox,
      passwordBox,
      confirmPasswordBox,
      signupButton,
    } = getInputFields();

    fireEvent.change(firstNameBox, { target: { value: newUser.firstName } });
    fireEvent.change(lastNameBox, { target: { value: newUser.lastName } });
    fireEvent.change(emailBox, { target: { value: newUser.email } });
    fireEvent.change(passwordBox, { target: { value: newUser.password } });
    fireEvent.change(confirmPasswordBox, {
      target: { value: 'different password' },
    });

    fireEvent.click(signupButton);
    expect(mockRegisterUser).not.toBeCalled();
  });

  it('should have a link back to the login page', () => {
    const link = screen.getByRole('link', {
      name: /already have an account\? sign in/i,
    });
    expect(link).toHaveAttribute('href', '/login');
  });
});
