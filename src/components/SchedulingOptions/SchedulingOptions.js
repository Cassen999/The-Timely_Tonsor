import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import BarberPicker from '../BarberPicker/BarberPicker';

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
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 300,
    height:55
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    color: 'white',
    justifyContent: 'center'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  buttonContainer: {
    float: 'right'
  },
  formControl: {
    minWidth: 190,
    maxWidth: 300,
  },
  selectEmpty: {
      marginTop: theme.spacing.unit * 2,
  },
});

class SchedulingOptions extends Component {
  state = {
    date: '',
    dotw: ''
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_ALL_USERS'})
    this.props.dispatch({type: 'FETCH_BARBERS'})
    console.log(this.props.store.allUsers)
    console.log(this.props.store.barbers)
  }

  handleInputChangeFor = (event) => {
    this.setState({
      date: event.target.value,
      dotw: moment(event.target.value).format('dddd'),
    });
  };

  handleConfirmationRoute = (event, id) => {
    event.preventDefault()
    if (this.state.date !== '' && this.state.time !== ''
        && this.state.barber !== '' && this.state.dotw !== '') {
          console.log('In handleConfirmationRoute, id: ', id)
          this.props.history.push(`/confirm/${id}`)
        }
        else {
          alert('Please fill out all fields to proceed to appointment confirmation')
        }
  }

  handleBack = (event) => {
    this.props.history.push('/user')
  }

  render() {
    const { classes } = this.props;
    return (
    <div>
      <h2>Please schedule your appointment below</h2>
        {JSON.stringify(this.props.store.user)}
      <h3>Choose Your Appointment Details</h3>
        <form onSubmit={this.selectDate} className={classes.container} noValidate>
          <div className={classes.root}>
            
            {/* Date Picker */}
            <Grid container spacing={2}
              alignItems="center"
              justify="center">
              <Grid item xs={6} className={classes.gridItem}>
                <Paper className={classes.paper}>
                  <TextField
                    id="date"
                    label="Select a Date"
                    type="date"
                    value={this.state.date}
                    onChange={this.handleInputChangeFor}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </form>
        {this.state.date !== '' ? <BarberPicker date={this.state.date} 
        dotw={this.state.dotw} /> : <p>Please choose a date</p>}
        <div>
          <Button 
            onClick={(event) => this.handleBack(event)}
            color="primary"
            variant="contained" 
            size="large" 
            className={classes.button}>
            Back
          </Button>
        </div>
        <div>
          <Button 
            onClick={(event) => this.handleConfirmationRoute(event, this.props.store.user.id)}
            color="primary"
            variant="contained" 
            size="large" 
            className={classes.button}>
            Continue
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(SchedulingOptions));
