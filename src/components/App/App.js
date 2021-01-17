import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { logInClient, registerUser, logOutClient } from '../../client/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import RegisterPage from '../RegisterPage/RegisterPage';
import PageHeader from '../PageHeader/PageHeader';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => {
  const [user, setUser] = useState(false);

  const handleSetUser = (user) => {
    setUser(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className='App'>
          <PageHeader
            user={user}
            logOutClient={logOutClient}
            handleSetUser={handleSetUser}
          />
          <Switch>
            <PrivateRoute exact path='/' user={user}>
              <HomePage user={user} />
            </PrivateRoute>
            <Route exact path='/login'>
              <LoginPage
                logInClient={logInClient}
                handleLogin={handleSetUser}
                user={user}
              />
            </Route>
            <Route exact path='/register'>
              <RegisterPage registerUser={registerUser} />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
