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
import DisableSelectBtn from '../DisableSelectBtn/DisableSelectBtn';
import swal from 'sweetalert';
import './SchedulingOptions.css'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridItem: {
    flexBasis: 0,
    marginTop: '10px',
    marginBottom: '10px'
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
  aptDetailHead: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#a9a9a9',
    borderRadius: 5,
    opacity: '80%',
    width: '60%',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px'
  },
  pickerInstructons: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#a9a9a9',
    borderRadius: 5,
    opacity: '80%',
    width: '60%',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
  },
  selectBtn: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  }
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
          swal({
            title: "Almost Done!",
            text: "This will confirm and book your appointment, is that ok?",
            icon: "info",
            buttons: ["Not yet", "Book it!"]
          })
          .then((confirm) =>{
            if(confirm) {
              return(
              this.props.dispatch({type: 'ADD_APPOINTMENT', 
                    payload: this.state}),
              this.setState({clicked: true}),
              this.props.history.push(`/confirm/${this.props.store.user.id}`)
              )
            }
            else {
              console.log('User isnt ready')
            }
          })
        }
  }

  handleBack = (event) => {
    swal({
      title: "Are you sure?",
      text: "If you go back now, this appointment won't be saved",
      icon: "warning",
      buttons: ["Nope", "Go back"]
    })
    .then((goBack) => {
      if(goBack) {
        this.props.history.push('/user')
      }
      else {
        console.log('User doesnt want to go back yet')
      }
    })
  }

  render() {
    const { classes } = this.props;
    return (
    <div className="container">
      <div className="panel">
        <div className="scrim">
          <h2>Please schedule your appointment below</h2>
          <h3>Choose Your Appointment Details</h3>
        </div>
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
          setBarber={this.setBarber} setTime={this.setTime}/> : 
          <p className="scrim">Please choose a date</p>}
          
          {this.state.apt_id !== '' && this.state.clicked === false ? 
              <div>
                <p className="scrim">
                  Click Book Appointment to reserve your spot!</p>
                <div className={classes.selectBtn}>
                <Button 
                  name="selectAppointment"
                  id="selectBtn"
                  onClick={(event) => this.chooseApt(event)}
                  color="primary"
                  variant="contained" 
                  size="large" 
                  className={classes.button}>
                    Book Appointment
                </Button>
                </div>
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
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(SchedulingOptions));