import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AptConfirmation extends Component {
  state = {
    time: '',
    barber: ''
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_CONF_TIME', 
    payload: this.props.store.addApt.id})
    this.setState({
      time: this.props.store.confTime.start_time
    })
  }

  goBack = (event) => {
    this.props.history.push('/user')
    this.props.dispatch({type: 'CON_DELETE', payload: this.props.store.addApt.id})
  }
  
  render() {
      console.log('apt conf time redux state', this.props.store.confTime)
      console.log('apt conf state: ', this.state.time)
    return (
      <div className="renderAptInfo">
        <h2>Your Appointment Details</h2>
        <p>Please review the details below, if they look correct,
            click the "Confirm Appointment" button. If not, click the
            back button to start the create appointment process over.
        </p>
        {JSON.stringify(this.state.time)}
        <h3>Date</h3>
        <p>{this.props.store.addApt.date}</p>
        <h3>Time</h3>
        <p>{this.props.store.confTime[0]?.start_time}</p>
        <button onClick={(event) => this.goBack(event)}>back</button>
        <button onClick={(event) => this.props.dispatch({type: 'FETCH_CONF_TIME', payload: this.props.store.addApt.id})}>test</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AptConfirmation);