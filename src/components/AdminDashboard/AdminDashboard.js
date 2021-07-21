import React from 'react';
import PropTypes from 'prop-types';
import RoleManagement from '../RoleManagement/RoleManagement';
import PermissionManagement from '../PermissionManagement/PermissionManagement';

AdminDashboard.propTypes = {
  handleload: PropTypes.any,
};

function AdminDashboard(props) {
  return (
    <div>
      <div>Metrics</div>
      <RoleManagement />
      <PermissionManagement />
      <div>Feedback</div>
    </div>
  );
}

export default AdminDashboard;
