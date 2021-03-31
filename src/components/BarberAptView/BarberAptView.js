import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function BarberAptView(props) {

  const [heading, setHeading] = useState('Appointment Details');

  const appointment = props.store.barberApt[0]

  const renderDetails = (appointment) => {
    return(
      <div>
        {appointment.id}
        {console.log(appointment)}
      </div>
    )
  }

  return (
    <div>
      <h2>{heading}</h2>
      {renderDetails(appointment)}
    </div>
  );
}

export default connect(mapStoreToProps)(BarberAptView);