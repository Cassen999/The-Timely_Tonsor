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

class BarberLandingPage extends Component {

  state = {
    date: '',
    isBarber: false,
  }
    
  componentDidMount() {
      // this.props.dispatch({type: 'FETCH_APPOINTMENTS'})
  }

  handleInputChangeFor = (event) => {
    this.setState({
      date: event.target.value,
    });
  };

  handleSelectDate = (event) => {
    event.preventDefault()
    console.log('in SelectDate')
  }
    
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>BarberLandingPage</h2>
        <h3>Select today's date</h3>
        <form onSubmit={this.selectDate} className={classes.container} noValidate>
          <div>
          <TextField
            id="date"
            label="Today's Date"
            type="date"
            value={this.state.date}
            onChange={this.handleInputChangeFor}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          </div>
        </form>
        {JSON.stringify(this.state)}
        {/* <h3>Today's date is {this.state.date} and it is a {this.props.store.appointments.dotw}</h3> */}
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Client Name</TableCell>
                        <TableCell align="right">Appointment Time</TableCell>
                        <TableCell align="right">Delete?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {this.props.store.appointments.map((appointment) => {
                        if (appointment.name !== '') {
                            return <TableCell align="right">{this.props.store.appointments.user_id.name}</TableCell>
                        }
                        if (appointment.time !== '') {
                            return <TableCell align="right">{this.props.store.appointments.time}</TableCell>
                        }
                    })} */}
                </TableBody>
            </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(BarberLandingPage));
