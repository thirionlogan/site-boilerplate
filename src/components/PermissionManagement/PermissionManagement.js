import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  getAllRoles,
  getAllPermissions,
  patchRolePermissions,
} from '../../client/client';
import TransferList from '../TransferList/TransferList';
// import PropTypes from 'prop-types';

PermissionManagement.propTypes = {};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function PermissionManagement(props) {
  const classes = useStyles();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState({ permissions: [] });
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    handleLoadRoles();
    getAllPermissions().then(({ data }) => {
      setPermissions(data);
    });
    getAllPermissions().then(({ data }) => {
      setPermissions(data);
    });
  }, []);

  useEffect(() => {
    if (selectedRole?.id)
      setSelectedRole(roles.find(({ id }) => +id === +selectedRole.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  const handleLoadRoles = () =>
    getAllRoles().then(({ data }) => {
      setRoles(data);
    });

  const handleChangeSelectedRole = ({ target: { value } }) =>
    setSelectedRole(roles.find(({ id }) => +id === +value));

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor='select-multiple-native'>
          Roles
        </InputLabel>
        <Select
          multiple
          native
          value={selectedRole?.id}
          onChange={handleChangeSelectedRole}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {roles.map((role) => (
            <option key={role.name} value={role.id}>
              {role.name}
            </option>
          ))}
        </Select>
      </FormControl>
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
