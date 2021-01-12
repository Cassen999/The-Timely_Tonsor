import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  gridItem: {
    flexBasis: 0,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 300
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
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

class UserLandingPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  state = {
    username: '',
    first_name: '',
    last_name: '',
    phone_number: '',
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div>
          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
          <p>From here, you can edit any profile information, or click the 
            Schedule Appointment button to schedule and appointment</p>
          <p>To edit your profile information, just type into the corresponding
            field and press Update to update that information
          </p>
        </div>
        <div className={classes.root}>
        <Grid container spacing={3}
          alignItems="center"
          justify="space-evenly">
          <Grid item xs={6} className={classes.gridItem}>
            <Paper className={classes.paper}>
              <TextField
                id="standard-name"
                placeholder={this.props.store.user.username}
                className={classes.textField}
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                margin="normal"
              />
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Paper className={classes.paper}>
              <TextField
                  id="standard-name"
                  placeholder={this.props.store.user.first_name}
                  className={classes.textField}
                  value={this.state.first_name}
                  onChange={this.handleInputChangeFor('first_name')}
                  margin="normal"
                />
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Paper className={classes.paper}>
              <TextField
                  id="standard-name"
                  placeholder={this.props.store.user.last_name}
                  className={classes.textField}
                  value={this.state.last_name}
                  onChange={this.handleInputChangeFor('last_name')}
                  margin="normal"
                />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <TextField
                  id="standard-name"
                  placeholder={this.props.store.user.phone_number}
                  className={classes.textField}
                  value={this.state.phone_number}
                  onChange={this.handleInputChangeFor('phone_number')}
                  margin="normal"
                />
            </Paper>
          </Grid>
        </Grid>
      </div>
          <div>
            <LogOutButton className="log-in" />
          </div>
        </div>
      );
    }
  }

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStoreToProps)(UserLandingPage));
