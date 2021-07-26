import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  getAllRoles,
  getAllPermissions,
  patchRolePermissions,
} from '../../client/client';
import TransferList from '../TransferList/TransferList';
import SelectedListItem from '../SelectedListItem/SelectedListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

function PermissionManagement() {
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState({ permissions: [] });
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    handleLoadRoles();
    getAllPermissions().then(({ data }) => {
      setPermissions(data);
    });
  }, []);

  useEffect(() => {
    if (selectedRole?.id)
      setSelectedRole(roles.find(({ id }) => +id === +selectedRole.id));
  }, [roles]);

  useEffect(() => {
    const availablePermissions = permissions
      .filter((permission) =>
        selectedRole?.permissions?.every(
          (selectedRolePermission) =>
            selectedRolePermission.id !== permission.id
        )
      )
      .map(({ name }) => name);
    setLeft([...selectedRole?.permissions?.map(({ name }) => name)]);
    setRight([...availablePermissions]);
  }, [selectedRole, permissions]);

  useEffect(() => {
    if (
      JSON.stringify(left.sort()) !==
      JSON.stringify(selectedRole?.permissions.map(({ name }) => name).sort())
    ) {
      const permissionObjects = permissions.filter(({ name }) =>
        left.includes(name)
      );
      patchRolePermissions(selectedRole.id, permissionObjects).then(
        handleLoadRoles
      );
    }
  }, [left]);

  useEffect(() => {
    if (roles?.length) setSelectedRole(roles[selectedIndex]);
  }, [roles, selectedIndex]);

  const handleLoadRoles = () =>
    getAllRoles().then(({ data }) => {
      setRoles(data);
    });

  return (
    <div className={classes.root}>
      <SelectedListItem
        list={roles.map(({ name }) => name)}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <TransferList
        left={left}
        right={right}
        setLeft={(value) => setLeft(value)}
        setRight={(value) => setRight(value)}
        leftLabel={'Role permissions'}
        rightLabel={'Available permissions'}
        disabled={!selectedRole.id}
      />
    </div>
  );
}

export default PermissionManagement;
