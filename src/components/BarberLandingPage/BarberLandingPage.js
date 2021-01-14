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

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

class BarberLandingPage extends Component {


  // componentDidMount -> GET appointments, map redux state

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>BarberLandingPage</h2>
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
                    {this.props.store.appointments.map((appointment) => {
                        if (appointment.name !== '') {
                            return <TableCell align="right">{this.props.store.appointments.user_id.name}</TableCell>
                        }
                        if (appointment.time !== '') {
                            return <TableCell align="right">{this.props.store.appointments.time}</TableCell>
                        }
                    })}
                </TableBody>
            </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(BarberLandingPage));
