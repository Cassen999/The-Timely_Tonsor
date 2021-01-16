import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AptConfirmation extends Component {
  state = {
    heading: this.props.date,
  };

  componentDidMount() {
    console.log('aptConfirm payload', this.props.store.appointments)
    this.props.dispatch({type: 'FETCH_APPOINTMENTS', payload: this.props.store.appointments.barber})
  }

  handleSubmit = (event) => {
  }

  render() {
    return (
      <div className="renderAptInfo">
        {<h1>{this.state.heading}</h1>}
        <h2>Your Appointment Details</h2>
        <p>Please review the details below, if they look correct,
            click the "Confirm Appointment" button. If not, click the
            back button to start the create appointment process over.
        </p>
        {/* <Button 
            onClick={(event) => this.handleSubmit(event, this.props.store.user.id)}
            color="primary"
            variant="contained" 
            size="large" 
            className={classes.button}>
            Continue
          </Button> */}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AptConfirmation);