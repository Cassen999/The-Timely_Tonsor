import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <RegisterForm />

        <center>
          <Button
            type="button"
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(RegisterPage));
