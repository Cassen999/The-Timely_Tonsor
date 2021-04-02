import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './BarberAptView.css';

function BarberAptView(props) {

  const [heading, setHeading] = useState('Appointment Details');

  const appointment = props.store.aptDetails

  // This converts the date into a readable format
  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };

  // This converts the phone number into a readable format
  const handlePhone = (phone) => {
    const p = phone
    console.log('phone number', p)
    return(
      `+1(${p[0]}${p[1]}${p[2]})-${p[3]}${p[4]}${p[5]}
      -${p[6]}${p[7]}${p[8]}${p[9]}`
    )
  }

  const renderDetails = (appointment) => {
    return(
      <div>
        <div className="container">
        <div className="grid">
          <div className="grid-col grid-col_8">
            {appointment.map((apt, i) => {
              return(
                <div>
                  <h6>
                    {apt.first_name} {apt.last_name}
                  </h6>
                  <h6>
                    {handlePhone(apt.phone_number)}
                  </h6>
                  <h6>
                    {handleDate(apt.date)}
                    {apt.start_time}
                  </h6>
                </div>
              )
            })}
          </div>
        </div>
        </div>
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