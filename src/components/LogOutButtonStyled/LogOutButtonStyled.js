import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  buttonContainer: {
    float: 'right'
  },
  logoutBtn: {
    margin: theme.spacing.unit
  }
});

const LogOutButton = (props) => (
  <div className="logoutBtn">
    <Button
      className={props.className}
      onClick={() => props.dispatch({ type: 'LOGOUT' })}
      color="secondary"
      variant="contained"
    >
      Log Out
    </Button>
  </div>
);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default withStyles(styles)(connect(mapStoreToProps)(LogOutButton));
