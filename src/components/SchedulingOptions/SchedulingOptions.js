import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import RenderBarberDropdown from '../RenderBarberDropdown/RenderBarberDropdown';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

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
    // margin: theme.spacing.unit,
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
    time: '',
    barber: '',
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
  
  handleChangeForBarber = (event) => {
    this.setState({
      barber: event.target.value})
    this.props.dispatch({type: 'FETCH_APT_SLOTS', payload: 
      {barber_id: event.target.value, date: this.state.dotw}})
    console.log(this.state)
  }

  handleChangeForTime = (event) => {
    this.setState({
      time: event.target.value,
    });
  };

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
            
            {/* Barber Picker */}
            <Grid item xs={6} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Available Barbers</InputLabel>
                      <Select
                          value={this.state.barber}
                          // pass in event and input property for handleChange
                          onChange={(event) => this.handleChangeForBarber(event)}
                          >
                              {/* map genres to populate the dropdown */}
                          {this.props.store.barbers.map((barber, i) => {
                              return(
                                  <MenuItem key={i} value={barber.id}>{barber.first_name}</MenuItem>
                              )
                          })}
                      </Select>
                    </FormControl>
                </div>
              </Paper>
            </Grid>

            {/* Time Picker */}
            <Grid item xs={6} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Available Times</InputLabel>
                      <Select
                          value={this.state.time}
                          // pass in event and input property for handleChange
                          onChange={(event) => this.handleChangeForTime(event)}
                          >
                            {JSON.stringify(this.props.store.aptSlots)}
                              {/* map genres to populate the dropdown */}
                          {this.props.store.aptSlots.map((slot) => {
                              return(
                                  <MenuItem value={slot.start_time}>{slot.start_time}</MenuItem>
                              )
                          })}
                      </Select>
                    </FormControl>
                 </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </form>
        <h3>Your appointment is on: {this.state.dotw} {this.state.date} 
            at {this.state.time} with {this.state.barber}</h3>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(SchedulingOptions));;
