import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LogOutButtonStyled from '../LogOutButtonStyled/LogOutButtonStyled';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// This function converts the date from the db into a readable format
const handleDate = (date) => {
  return (date = new Date(date).toDateString());
};

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  buttonContainer: {
    float: 'right'
  }
});

class AptConfirmation extends Component {

  // componentDidMount() {
  //   // Dispatches to get appointment time of set appointment
  //   // and the name of the barber
  //   this.props.dispatch({type: 'FETCH_CONF_TIME', 
  //     payload: this.props.store.addApt.id})
  //   this.props.dispatch({type: 'FETCH_CONF_BARBER', 
  //     payload: this.props.store.addApt.appt_id})
  // }

  // Back button function also deletes the appointment that was set
  goBack = (event) => {
    this.props.history.push('/user')
    this.props.dispatch({type: 'CON_DELETE', payload: this.props.store.addApt.id})
  }

  finished = (event) => {
    this.props.history.push('/user')
  }
  
  render() {
    const date = this.props.store.addApt.date;
    const classes = this.props.classes;
    return (
      <div className="renderAptInfo">
        <h2>Your Appointment Details</h2>
        <p>Please review the details below, if they look correct,
            click the "I'm Finished" button. If not, click the
            back button to delete the scheduled appointment and start over.
        </p>
        <h3>Date</h3>
        {/* Call handleDate function to render formatted date */}
        {handleDate(date)}
        <h3>Time</h3>
        {/* Call redux store for time, make it wait until it is created */}
        <p>{this.props.store.addApt.start_time}</p>
        <h3>Your Barber</h3>
        {/* Call redux store for barber name, make it wait until it is created */}
        <p>{this.props.store.addApt.first_name}</p>
        <button onClick={(event) => this.goBack(event)}>back</button>
        <div>
          <Button 
            onClick={(event) => this.goBack(event)}
            color="primary"
            variant="contained" 
            size="large" 
            className={classes.button}>
            Delete and Remake Appointment
          </Button>
        </div>
        <div>
          <Button 
            onClick={(event) => this.finished(event)}
            color="primary"
            variant="contained" 
            size="large" 
            className={classes.button}>
            Finished
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(AptConfirmation));