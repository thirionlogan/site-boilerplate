import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

SelectedListItem.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  setSelectedIndex: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    minWidth: 200,
    height: 230,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SelectedListItem({
  list,
  selectedIndex,
  setSelectedIndex,
}) {
  const classes = useStyles();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Paper className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {list.map((item, index) => (
          <ListItem
            key={item}
            button
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
