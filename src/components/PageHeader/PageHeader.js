import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  MenuItem,
  Menu,
  makeStyles,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

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

function PageHeader({ user, logOutClient, handleSetUser }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logOutClient();
    handleSetUser(false);
    handleClose();
  };

  return (
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
  );
}

export default PageHeader;
