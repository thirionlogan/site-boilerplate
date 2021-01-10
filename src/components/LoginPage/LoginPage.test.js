import { mount } from 'enzyme';
import React from 'react';
import LoginPage from './LoginPage';
import { mockLogInClient } from '../../client/mockClient';
import { Button } from '@material-ui/core';

describe('LoginPage', () => {
  let component;
  beforeEach(() => {
    component = mount(<LoginPage logInClient={mockLogInClient} />);
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
  it('should require email', () => {});
  it('should require password', () => {});
});
