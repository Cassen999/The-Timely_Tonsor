import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

const handleDate = (date) => {
  return (date = new Date(date).toDateString());
};

class AptConfirmation extends Component {

  componentDidMount() {
    
    this.props.dispatch({type: 'FETCH_CONF_TIME', 
      payload: this.props.store.addApt.id})
    this.props.dispatch({type: 'FETCH_CONF_BARBER', 
      payload: this.props.store.addApt.appt_id})
  }

  goBack = (event) => {
    this.props.history.push('/user')
    this.props.dispatch({type: 'CON_DELETE', payload: this.props.store.addApt.id})
  }
  
  render() {
    const date = this.props.store.addApt.date
    return (
      <div className="renderAptInfo">
        <h2>Your Appointment Details</h2>
        <p>Please review the details below, if they look correct,
            click the "I'm Finished" button. If not, click the
            back button to delete the scheduled appointment and start over.
        </p>
        <h3>Date</h3>
        {handleDate(date)}

        <h3>Time</h3>
        <p>{this.props.store.confTime[0]?.start_time}</p>
        <h3>Your Barber</h3>
        <p>{this.props.store.confBarber[0]?.first_name}</p>
        <button onClick={(event) => this.goBack(event)}>back</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AptConfirmation);