import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import DateConverter from '../DateConverter/DateConverter';
import './BarberLandingPage.css';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      margin: theme.spacing.unit * 1.5,
      width: 200,
      color: 'white'
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
    schedPicker: {
      margin: 'auto',
      justifyContent: 'center',
      display: 'flex'
      }
  });

  const handleDate = (date) => {
    return (date = new Date(date).toDateString());
  };
  class BarberLandingPage extends Component {

    state = {
      date: ''
    }
    
    componentDidMount() {
      // Fetches current date on mount and displays on apt table
      this.getDate()
    }
    
    // Used for the component did mount, gives an initial date for apt table
    getDate = () => {
      let today = new Date()
      let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
      this.setState({
        date: date
      })
      this.props.dispatch({type: 'FETCH_BARBER_APT', 
      payload: {id: this.props.store.user.id, date: date}})
    }
    
    // Called when a date is selected from date picker
    handleSelectDate = (event) => {
      // Calls convertDigitIn to convert date to mm/dd/yyyy
      this.convertDigitIn(event.target.value)
      this.props.dispatch({type: 'FETCH_BARBER_APT', 
        payload: {id: this.props.store.user.id, date: event.target.value}})
    }
    
    // Sets the state to selected converted date 
    convertDigitIn(date){
    let splitDate = date.split('-')
    let month = this.setMonth(splitDate)
    let day = this.setDay(splitDate)
    let year = splitDate[0]
    let newDate = `${month}/${day}/${year}`
    this.setState({
      date: newDate
    })
  }

  // Converts month to a number to display mm as m if single digit
  setMonth(month){
    for(let i = 1; i < month.length; i++){
      return month = Number(month[i][1])
    }
  }

  // Converts day to a number to display dd as d if single digit
  setDay(day){
    for(let j = 2; j < day.length; j++) {
      return day = Number(day[j])
    }
  }

  handleDelete = (appt_id, id, date) => {
    this.props.dispatch({type: 'DELETE', payload: {aptId: appt_id, userId: id, date: date, 
      barberId: this.props.store.user.id}})
    console.log('handle delete event', appt_id)
  }

  aptDetailClick = (aptSlot_id) => {
    console.log('aptSlot_id barberlandingpage', aptSlot_id)
    this.props.dispatch({type: 'FETCH_APT_DETAILS', payload: aptSlot_id})
    this.props.history.push("/barberAptView")
  }
    
  render() {
    const isDateAfterToday = (date) => {
      return new Date(date.toDateString()) >= new Date(new Date().toDateString());
    };
    const { classes } = this.props;
    return (
      <div className="container">
        <div className="panel">
          <div className="scrim">
            <h2>Welcome {this.props.store.user.first_name}</h2>
          </div>
        <form onSubmit={this.selectDate} className={classes.container} noValidate>
          <div className={classes.schedPicker}>
            <Paper className={classes.root}>
              <TextField
                id="date"
                label="Choose a Date"
                type="date"
                onChange={this.handleSelectDate}
                value={this.state.date}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                />
              </Paper>
          </div>
        </form>
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                  <Toolbar>{this.state.date}</Toolbar>
                    <TableRow>
                        <TableCell align="right">Appointment Date</TableCell>
                        <TableCell align="right">Appointment Time</TableCell>
                        <TableCell align="right">Client Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.store.barberApt.map((apt, i) => {
                      return( 
                        // On click to detailed view goes on the table row
                        <TableRow key={i}
                          onClick={() => this.aptDetailClick(apt.appt_id)}
                          className="clickable">
                          <TableCell align="right">{handleDate(apt.date)}</TableCell>
                          <TableCell align="right">{apt.start_time}</TableCell>
                          <TableCell align="right">{apt.first_name}</TableCell>
                          <TableCell className="deleteBtn" value={apt.appt_id}>
                          {isDateAfterToday(new Date(apt.date)) ? 
                            <Button
                              align="center"
                              color="secondary"
                              variant="contained" 
                              size="large" 
                              onClick={() => this.handleDelete(apt.appt_id, apt.id, apt.date)}
                              className={classes.button}>
                                <DeleteIcon className={classes.rightIcon} />
                                delete</Button> : null}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
            </Table>
        </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(BarberLandingPage));