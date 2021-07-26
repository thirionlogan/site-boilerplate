import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

PrivateRoute.propTypes = {
  children: PropTypes.element,
  user: PropTypes.object,
  rest: PropTypes.any,
};

export default function PrivateRoute({ children, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.id ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
