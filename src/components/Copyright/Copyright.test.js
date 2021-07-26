import Copyright from './Copyright';
import { MemoryRouter } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';
import { mount } from 'enzyme';
import React from 'react';

describe('Copyright', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <Copyright />
      </MemoryRouter>
    );
  });
  it('should render', () => {
    expect(component.find(Link).props().to).toBe('/');
    expect(component.find(Typography).first().text()).toMatch(
      /Copyright\s©\sSite\sBoilerplate\s\d+\./
    );
  });
});
