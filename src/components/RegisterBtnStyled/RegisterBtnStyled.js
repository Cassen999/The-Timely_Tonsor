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
  }
});

const RegisterBtnStyled = (props) => (
  <center>
  <Button
    className={props.className}
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
    color="primary"
    variant="contained"
  >
    Register
  </Button>
</center>
);

export default withStyles(styles)(connect(mapStoreToProps)(RegisterBtnStyled));