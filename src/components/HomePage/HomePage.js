import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const HomePage = ({ user }) => {
  const classes = useStyles();
  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        {user ? (
          <Typography>WELCOME TO HOME</Typography>
        ) : (
          <Typography>Please Log in</Typography>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
