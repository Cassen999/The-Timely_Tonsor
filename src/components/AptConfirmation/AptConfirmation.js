import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AptConfirmation extends Component {
  state = {
    heading: 'Class Component',
  };

  goBack = (event) => {
    this.props.history.push('/user')
  }

  render() {
    return (
      <div className="renderAptInfo">
        <h2>Your Appointment Details</h2>
        <p>Please review the details below, if they look correct,
            click the "Confirm Appointment" button. If not, click the
            back button to start the create appointment process over.
        </p>
        {JSON.stringify(this.props.store.addApt)}
        <button onClick={(event) => this.goBack(event)}>back</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AptConfirmation);