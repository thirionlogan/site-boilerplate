import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getAllUsers, getAllRoles, patchUserRoles } from '../../client/client';
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

function RoleManagement() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ roles: [] });
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  useEffect(() => {
    if (users?.length) setSelectedUser(users[selectedIndex]);
  }, [users, selectedIndex]);

  const handleLoadUsers = () =>
    getAllUsers().then(({ data }) => {
      setUsers(data);
    });

  return (
    <div className={classes.root}>
      <SelectedListItem
        list={users.map(
          ({ firstName, lastName }) => firstName + ' ' + lastName
        )}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <TransferList
        left={left}
        right={right}
        setLeft={(value) => setLeft(value)}
        setRight={(value) => setRight(value)}
        leftLabel={'User roles'}
        rightLabel={'Available roles'}
        disabled={!selectedUser?.id}
      />
    </div>
  );
}

export default RoleManagement;
