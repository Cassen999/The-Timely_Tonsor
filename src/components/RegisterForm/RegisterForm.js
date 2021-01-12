import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class RegisterForm extends Component {

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    is_barber: false,
    showPassword: false
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone_number: this.state.phone_number,
        is_barber: this.state.is_barber
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2 className="formPanelTitle">Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
            <TextField
              required
              id="standard-name"
              label="Desired Username"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              margin="normal"
            />
        </div>
        <div>
          <Input
              required
              type={this.state.showPassword ? 'text' : 'password'}
              id="standard-name"
              placeholder="Desired Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              margin="normal"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}>
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                  }
            />
        </div>
        <div>
          <TextField
            required
            id="standard-name"
            label="First Name"
            className={classes.textField}
            value={this.state.first_name}
            onChange={this.handleInputChangeFor('first_name')}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            required
            id="standard-name"
            label="Last Name"
            className={classes.textField}
            value={this.state.last_name}
            onChange={this.handleInputChangeFor('last_name')}
            margin="normal"
          />
        </div>
        <div>
        <TextField
            required
            id="standard-name"
            label="Phone 5555555555"
            className={classes.textField}
            value={this.state.phone_number}
            onChange={this.handleInputChangeFor('phone_number')}
            margin="normal"
          />
        </div>
        <div>
        <InputLabel htmlFor="Are you a barber?">Are you a barber or client?</InputLabel>
          <Select
            value={this.state.is_barber}
            onChange={this.handleInputChangeFor('is_barber')}
          >
            <MenuItem value={true}>Barber</MenuItem>
            <MenuItem value={false}>Client</MenuItem>
          </Select>
        </div>
        <div>
          <Button 
            classname="btn"
            type="submit"
            variant="contained" 
            size="small" 
            value="Register"
            className={classes.button}>
            <SaveIcon className={classes.leftIcon, classes.iconSmall} />
            Register
          </Button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(RegisterForm));
