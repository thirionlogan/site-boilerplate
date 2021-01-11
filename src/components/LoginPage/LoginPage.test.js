import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import LoginPage from './LoginPage';
import { mockLogInClient } from '../../client/mockClient';
import { Button } from '@material-ui/core';

describe('LoginPage', () => {
  let component;
  let mockHandleLogin = jest.fn();
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <LoginPage
          logInClient={mockLogInClient}
          handleLogin={mockHandleLogin}
          user={false}
        />
      </MemoryRouter>
    );
  });
  it('should log in', async () => {
    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: 'johndoe@email.com' } });

    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: 'password' } });

    component.find(Button).simulate('click');

    expect(mockLogInClient).toBeCalledWith({
      email: 'johndoe@email.com',
      password: 'password',
    });
  });
  it('should require email', () => {
    component
      .find('#password')
      .find('input')
      .simulate('change', { target: { value: 'password' } });

    component.find(Button).simulate('click');
    expect(mockLogInClient).not.toBeCalled();
  });
  it('should require password', () => {
    component
      .find('#email')
      .find('input')
      .simulate('change', { target: { value: 'johndoe@email.com' } });

    component.find(Button).simulate('click');
    expect(mockLogInClient).not.toBeCalled();
  });
});
