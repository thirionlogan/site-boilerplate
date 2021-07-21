import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getAllUsers, getAllRoles, patchUserRoles } from '../../client/client';
import TransferList from '../TransferList/TransferList';
import PropTypes from 'prop-types';

RoleManagement.propTypes = {};

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

function RoleManagement(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ roles: [] });
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    handleLoadUsers();
    getAllRoles().then(({ data }) => {
      setRoles(data);
    });
  }, []);

  useEffect(() => {
    if (selectedUser?.id)
      setSelectedUser(users.find(({ id }) => +id === +selectedUser.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    const availableRoles = roles
      .filter((role) =>
        selectedUser?.roles?.every(
          (selectedUserRole) => selectedUserRole.id !== role.id
        )
      )
      .map(({ name }) => name);
    setLeft([...selectedUser?.roles?.map(({ name }) => name)]);
    setRight([...availableRoles]);
  }, [selectedUser, roles]);

  useEffect(() => {
    if (
      JSON.stringify(left.sort()) !==
      JSON.stringify(selectedUser?.roles.map(({ name }) => name).sort())
    ) {
      const roleObjects = roles.filter(({ name }) => left.includes(name));
      patchUserRoles(selectedUser.id, roleObjects).then(handleLoadUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  const handleLoadUsers = () =>
    getAllUsers().then(({ data }) => {
      setUsers(data);
    });

  const handleChangeSelectedUser = ({ target: { value } }) =>
    setSelectedUser(users.find(({ id }) => +id === +value));

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor='select-multiple-native'>
          Users
        </InputLabel>
        <Select
          multiple
          native
          value={selectedUser?.id}
          onChange={handleChangeSelectedUser}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {users.map((user) => (
            <option key={user.firstName + ' ' + user.lastName} value={user.id}>
              {user.firstName + ' ' + user.lastName}
            </option>
          ))}
        </Select>
      </FormControl>
      <TransferList
        left={left}
        right={right}
        setLeft={(value) => setLeft(value)}
        setRight={(value) => setRight(value)}
        leftLabel={'User roles'}
        rightLabel={'Available roles'}
        disabled={!selectedUser.id}
      />
    </div>
  );
}

export default RoleManagement;
