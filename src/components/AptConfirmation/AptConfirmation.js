import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AptConfirmation extends Component {
  state = {
    id: this.props.store.addApt.id,
    date: this.props.store.addApt.date,
    time: this.props.store.addApt.time,
    barber: ''
  };

  // componentDidMount() {
  //   console.log(this.state)
  // }

  goBack = (event) => {
    this.props.history.push('/user')
    this.props.dispatch({type: 'CON_DELETE', payload: this.props.store.addApt.id})
  }
  
  render() {
      console.log(this.state)
    return (
      <div className="renderAptInfo">
        <h2>Your Appointment Details</h2>
        <p>Please review the details below, if they look correct,
            click the "Confirm Appointment" button. If not, click the
            back button to start the create appointment process over.
        </p>
        {JSON.stringify(this.props.store.addApt)}
        <h3>Date</h3>
        <p>{this.props.store.addApt.id}</p>
        <h3>Time</h3>
        <p>sdfg</p>
        <button onClick={(event) => this.goBack(event)}>back</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AptConfirmation);