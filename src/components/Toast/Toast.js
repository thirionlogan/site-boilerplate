import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
};

function Toast({ open, handleClose, children, severity }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        elevation={6}
        variant="filled"
      >
        {children}
      </MuiAlert>
    </Snackbar>
  );
}

export default Toast;
