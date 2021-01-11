import React, { useState } from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { logInClient, registerUser, logOutClient } from '../../client/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import RegisterPage from '../RegisterPage/RegisterPage';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  MenuItem,
  Menu,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const [user, setUser] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    logOutClient();
    setUser(false);
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className='App'>
          <AppBar position='static'>
            <Toolbar>
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                Site Boilerplate
              </Typography>
              {user ? (
                <div>
                  <IconButton
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleMenu}
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      to='/login'
                      component={RouterLink}
                    >
                      Log out
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button color='inherit' to='/login' component={RouterLink}>
                  Login
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/login'>
              <LoginPage
                logInClient={logInClient}
                handleLogin={handleLogin}
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
