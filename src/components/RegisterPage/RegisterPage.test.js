import RegisterPage from './RegisterPage';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { mockRegisterUser } from '../../client/mockClient';
import React from 'react';

describe('RegisterPage', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <RegisterPage registerUser={mockRegisterUser} />
      </MemoryRouter>
    );
  });
  const newUser = {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bobsmith@email.com',
    password: 'password',
  };
  it('should register user', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });

    component.find(Button).simulate('click');

    expect(mockRegisterUser).toBeCalledWith({
      ...newUser,
      confirmPassword: newUser.password,
    });
  });
  it('should require First Name', () => {
    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Last Name', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Email', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Password', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Confirm Password', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    expect(mockRegisterUser).not.toBeCalled();
  });
  it('should require Confirm Password to be the same as Password', () => {
    component
      .find('#firstName')
      .find('input')
      .simulate('change', { target: { value: newUser.firstName } });

    component
      .find('#lastName')
      .find('input')
      .simulate('change', { target: { value: newUser.lastName } });

    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: newUser.email } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: newUser.password } });
    component
      .find('#confirmPassword')
      .find('input')
      .simulate('change', { target: { value: 'different password' } });
    expect(mockRegisterUser).not.toBeCalled();
  });
});
