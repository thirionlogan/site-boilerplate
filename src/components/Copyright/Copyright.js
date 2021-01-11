import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' component={RouterLink} to='/'>
        Site Boilerplate
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
