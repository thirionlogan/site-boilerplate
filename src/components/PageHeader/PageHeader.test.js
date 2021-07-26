import React from 'react';
import { mount } from 'enzyme';
import PageHeader from './PageHeader';
import { MemoryRouter } from 'react-router-dom';
import { mockLogOutClient } from '../../client/mockClient';
import { Menu, MenuItem, Button } from '@material-ui/core';

describe('PageHeader', () => {
  let component;
  const mockHandleSetUser = jest.fn();

  describe('When the user is logged in', () => {
    beforeEach(() => {
      component = mount(
        <MemoryRouter>
          <PageHeader
            user={{ id: 1 }}
            logOutClient={mockLogOutClient}
            handleSetUser={mockHandleSetUser}
          />
        </MemoryRouter>
      );
    });
    it('should log out', () => {
      component.find(Menu).simulate('click');
      component.find(MenuItem).at(2).simulate('click');
      expect(mockLogOutClient).toBeCalled();
    });
  });

  describe('When the user is not logged in', () => {
    beforeEach(() => {
      component = mount(
        <MemoryRouter>
          <PageHeader
            user={{}}
            logOutClient={mockLogOutClient}
            handleSetUser={mockHandleSetUser}
          />
        </MemoryRouter>
      );
    });
    it('Log in button should exist', () => {
      expect(component.exists(Button)).toBe(true);
      expect(component.find(Button).text()).toBe('Login');
    });
  });
});
