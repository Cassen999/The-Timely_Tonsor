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
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
      color: 'white'
    },
  });

class AptHistoryTable extends Component {
    
  componentDidMount() {
      this.props.dispatch({type: 'FETCH_HISTORY', payload: this.props.store.user.id})
  }

  handleInputChangeFor = (event) => {
    this.setState({
      date: event.target.value,
    });
  };
    
  render() {
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
                        <TableCell align="right">Appointment Date</TableCell>
                        <TableCell align="right">Appointment Time</TableCell>
                        <TableCell align="right">Barber's Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.store.history.map(apt => (
                    <TableRow key={apt.id}>
                      <TableCell align="right">{handleDate(apt.date)}</TableCell>
                      <TableCell align="right">{apt.start_time}</TableCell>
                      <TableCell align="right">{apt.first_name}</TableCell>
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