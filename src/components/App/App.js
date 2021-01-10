import React from 'react';
import LoginPage from '../LoginPage/LoginPage';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { logInClient } from '../../client/client';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>
        <LoginPage logInClient={logInClient} />
      </div>
    </ThemeProvider>
  );
};

export default App;
