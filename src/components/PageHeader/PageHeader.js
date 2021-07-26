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
import SideDrawer from '../SideDrawer/SideDrawer';
import PropTypes from 'prop-types';

PageHeader.propTypes = {
  logOutClient: PropTypes.func.isRequired,
  handleSetUser: PropTypes.func.isRequired,
  user: PropTypes.object,
};

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
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(isOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {user.id ? (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        ) : null}
        <Typography variant="h6" className={classes.title}>
          Site Boilerplate
        </Typography>
        {user.id ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="inherit" to="/login" component={RouterLink}>
            Login
          </Button>
        )}
      </Toolbar>
      <SideDrawer toggleDrawer={toggleDrawer} open={drawerOpen} />
    </AppBar>
  );
}

export default PageHeader;
