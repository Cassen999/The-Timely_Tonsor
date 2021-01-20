import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import BarberPicker from '../BarberPicker/BarberPicker';
import AptConfirmation from '../AptConfirmation/AptConfirmation';
import DisableSelectBtn from '../DisableSelectBtn/DisableSelectBtn';

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
    user_id: Number(this.props.store.user.id),
    apt_id: '',
    date: '',
    dotw: '',
    barber: '',
    time: '',
    clicked: false
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_BARBERS'})
    console.log(this.props.store.barbers)
  }

  handleInputChangeForDate = (event) => {
    event.preventDefault();
    this.setState({
      date: event.target.value,
      dotw: moment(event.target.value).format('dddd'),
    });
  };

  setBarber = (event) => {
    event.preventDefault();
    this.setState({
      barber: event.target.value
    })
    this.props.dispatch({type: 'FETCH_APT_SLOTS', payload: 
        {barber_id: event.target.value, date: this.state.dotw}})
  }

  setTime = (event) => {
    event.preventDefault()
    this.setState({
      apt_id: event.target.value,
    })
    console.log('setTime event.target', event.target)
  }

  chooseApt = () => {
    if (this.state.date !== '' && this.state.apt_id !== ''
        && this.state.barber !== '' && this.state.dotw !== '') {
          this.props.dispatch({type: 'ADD_APPOINTMENT', 
                payload: this.state})
          this.setState({clicked: true})
          this.props.history.push(`/confirm/${this.props.store.user.id}`)
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
      <h3>Choose Your Appointment Details</h3>
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
                    onChange={this.handleInputChangeForDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
        {this.state.date !== '' ? <BarberPicker state={this.state} 
         setBarber={this.setBarber} setTime={this.setTime}/> : <p>Please choose a date</p>}
  
        {this.state.apt_id !== '' && this.state.clicked == false ? 
          <div>
            <p>Click this button to book your appointment then press Continue</p>
            <Button 
              name="selectAppointment"
              id="selectBtn"
              onClick={(event) => this.chooseApt(event)}
              color="primary"
              variant="contained" 
              size="large" 
              className={classes.button}>
                Select Appointment
            </Button>
          </div> : 
          <DisableSelectBtn />}
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
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(SchedulingOptions));