import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TimePicker from '../TimePicker/TimePicker';

const styles = (theme) => ({
    paper: {
      padding: theme.spacing.unit * 1,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: 300,
      height:55,
      margin: 'auto',
      marginTop: '10px',
      marginBottom: '10px'
    },
    dense: {
      marginTop: 19,
    },
    formControl: {
      minWidth: 190,
      maxWidth: 300,
    },
  });

class BarberPicker extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_BARBERS'})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2 className="scrim">Choose a Barber</h2>
            <Paper className={classes.paper}>
            <div>
                <FormControl className={classes.formControl}>
                <InputLabel>Available Barbers</InputLabel>
                    <Select
                        value={this.props.state.barber}
                        // pass in event and input property for handleChange
                        onChange={(event) => this.props.setBarber(event)}
                        >
                            {/* map barbers to populate the dropdown */}
                        {this.props.store.barbers.map((barber, i) => {
                            return(
                                <MenuItem key={i} value={barber.id}>{barber.first_name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
        </Paper>
        {this.props.state.barber === '' ? <p>Choose a Barber</p>  : 
        <TimePicker state={this.props.state} setTime={this.props.setTime} />}
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(BarberPicker));