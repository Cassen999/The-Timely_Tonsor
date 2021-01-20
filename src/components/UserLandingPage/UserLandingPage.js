import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButtonStyled from '../LogOutButtonStyled/LogOutButtonStyled';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
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
  gridItem: {
    flexBasis: 0,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 300,
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
  buttonContainer: {
    float: 'right'
  }
});


class UserLandingPage extends Component {
  state = {
    username: this.props.store.user.username,
    first_name: this.props.store.user.first_name,
    last_name: this.props.store.user.last_name,
    phone_number: this.props.store.user.phone_number,
  };
  
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleUserUpdate = (event) => {
    event.preventDefault();
    console.log('in user update', this.state)
    this.props.dispatch({
      type: 'UPDATE_USER',
      payload: this.state});
    this.props.history.push(`/user`);
  };

  handleRedirectScheduler = (event, id) => {
    event.preventDefault()
    console.log('In handleRedirect, id: ', id)
    this.props.history.push(`/scheduling/${id}`)
  }
  
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div>
          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
          <p>From here, you can edit any profile information, or click the 
            Schedule Appointment button to schedule an appointment</p>
          <p>To edit your profile information, just type into the corresponding
            field and press Update to update that information
          </p>
        </div>
        <form onSubmit={this.handleUserUpdate}>
        <div className={classes.root}>
          <Grid container spacing={6}
            alignItems="center"
            justify="center">
            <Grid item xs={6} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <TextField
                  helperText="Username"
                  placeholder= {this.props.store.user.username}
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
                    helperText="First Name"
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
                    helperText="Last Name"
                    placeholder={this.props.store.user.last_name}
                    className={classes.textField}
                    value={this.state.last_name}
                    onChange={this.handleInputChangeFor('last_name')}
                    margin="normal"
                  />
              </Paper>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <TextField
                    helperText="Phone Number"
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
        <div className={classes.buttonContainer}>
          <Button 
            color="primary"
            className="btn"
            type="submit"
            variant="contained" 
            size="small" 
            value="Register"
            className={classes.button}>
            <SaveIcon className={classes.leftIcon, classes.iconSmall} />
            Save
          </Button>
        </div>
        </form>
        <div>
          <LogOutButtonStyled className="log-in" />
        </div>
        <div>
          <Button 
            onClick={(event) => this.handleRedirectScheduler(event, this.props.store.user.id)}
            color="primary"
            variant="contained" 
            size="large" 
            className={classes.button}>
            Make an Appointment
          </Button>
        </div>
      </div>
      );
    }
  }

export default withStyles(styles)(connect(mapStoreToProps)(UserLandingPage));
