import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './BarberAptView.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';


function BarberAptView(props) {

  // const apt = useSelector(state => state.aptDetails)

  const appointment = props.store.aptDetails

  const [notes, setNotes] = useState('');
  // const [appointment, setApt] = useState()

  const dispatch = useDispatch();

  // useEffect(() => {
  //   // {appointment.map((apt) => {
  //   //   dispatch({type: 'FETCH_APT_DETAILS', payload: apt.appt_id})
  //   //   setNotes(apt.notes)
  //   // })}
  //   // dispatch({type: 'FETCH_APT_DETAILS', payload: appointment.appt_id})
  //   setApt(apt)
  //   console.log(appointment)
  // }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      background: 'white'
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  // This converts the date into a readable format
  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };

  // This converts the phone number into a readable format
  const handlePhone = (phone) => {
    const p = phone
    return(
      `+1 (${p[0]}${p[1]}${p[2]})-${p[3]}${p[4]}${p[5]}-${p[6]}${p[7]}${p[8]}${p[9]}`
    )
  }

  // Sets the state to the input field for notes
  const handleInputChange = (e) => {
    setNotes(e.target.value)
  }

  // Dispatches new notes and refreshes the reducer
  const saveChanges = (user_id, appt_id) => {
    dispatch({type: 'UPDATE_NOTE' , payload: {user_id: user_id, notes: notes}})
    dispatch({type: 'FETCH_APT_DETAILS', payload: appt_id})
  }

  const classes = useStyles();

  const renderDetails = (appointment) => {
    return(
      <div>
        <div className="container">
          <div className="panel">
            <div className="scrim">
              <div className="grid">
                <div className="grid-col grid-col_8">
                  {appointment.map((apt, i) => {
                    return(
                      <div>
                        <h4>
                          {apt.first_name} {apt.last_name}
                        </h4>
                        <h4>
                          {handlePhone(apt.phone_number)}
                        </h4>
                        <h4>
                          {handleDate(apt.date)} At {apt.start_time}
                        </h4>
                        <TextField
                          id="outlined-multiline-static"
                          key={i}
                          className={classes.root}
                          label="Client Notes"
                          multiline
                          rows={4}
                          defaultValue={apt.notes}
                          variant="filled"
                          onChange={(e) => handleInputChange(e)}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.button}
                          startIcon={<SaveIcon />}
                          // Send the appt_id so I can get new note data
                          // to display current saved note in text box
                          onClick={() => {saveChanges(apt.user_id, apt.appt_id)}}
                        >
                          Save Changes
                        </Button>
                      </div>
                    )
                  })}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // const {first_name, last_name} = appointment
  return (
    <div>
      {renderDetails(appointment)}
      {/* {JSON.stringify(first_name)}
      <h2>{first_name}</h2> */}
    </div>
  );
}

export default connect(mapStoreToProps)(BarberAptView);