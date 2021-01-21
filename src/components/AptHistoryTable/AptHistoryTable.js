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
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      maxWidth: 1200,
      float: 'center'
    },
    table: {
      minWidth: 700
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
      color: 'white'
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
    deleteBtn: {
      justifyContent: 'center'
    }
  });

  

class AptHistoryTable extends Component {
    
  componentDidMount() {
      this.props.dispatch({type: 'FETCH_HISTORY', payload: this.props.store.user.id})
  }

  handleDelete = (appt_id) => {
    this.props.dispatch({type: 'DELETE', payload: {aptId: appt_id, userId: this.props.store.user.id}})
    console.log('handle delete event', appt_id)
  }
  
  render() {
    const isDateAfterToday = (date) => {
      return new Date(date.toDateString()) > new Date(new Date().toDateString());
    };
    const { classes } = this.props;
    const handleDate = (date) => {
      return (date = new Date(date).toDateString());
    };
    return (
      <div>
        <h2>Appointment History and Future Appointments</h2>
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Appointment Date</TableCell>
                        <TableCell align="center">Appointment Time</TableCell>
                        <TableCell align="center">Barber's Name</TableCell>
                        <TableCell align="center">Delete?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.store.history.map((apt, i) => (
                    <TableRow key={i}>
                      <TableCell value={apt.appt_id} align="center">{handleDate(apt.date)}</TableCell>
                      <TableCell value={apt.appt_id} align="center">{apt.start_time}</TableCell>
                      <TableCell value={apt.appt_id} align="center">{apt.first_name}</TableCell>
                      <TableCell className="deleteBtn" value={apt.appt_id}>
                      {isDateAfterToday(new Date(apt.date)) ? 
                        <Button
                          align="center"
                          color="secondary"
                          variant="contained" 
                          size="large" 
                          onClick={() => this.handleDelete(apt.appt_id)}
                          className={classes.button}>
                            <DeleteIcon className={classes.rightIcon} />
                            delete</Button> : null}
                        </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
            </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(AptHistoryTable));