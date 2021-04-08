import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './BarberAptView.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';


export function BarberAptView(props) {

  const appointment = props.store.aptDetails

  const [notes, setNotes] = useState(' ');

  const dispatch = useDispatch();

  useEffect(() => {
    {appointment.map((apt) => {
      dispatch({type: 'FETCH_APT_DETAILS', payload: apt.appt_id})
      setNotes(apt.notes)
    })}
  }, [])

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

  const handleInputChange = (e) => {
    setNotes(e.target.value)
    console.log('notes e.target.value', e.target.value);
    console.log('state notes', notes)
  }

  const saveChanges = (user_id) => {
    dispatch({type: 'UPDATE_NOTE' , payload: {user_id: user_id, notes: notes}})
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
                          onClick={() => {saveChanges(apt.user_id)}}
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

  return (
    <div>
      {renderDetails(appointment)}
    </div>
  );
}

export default connect(mapStoreToProps)(BarberAptView);