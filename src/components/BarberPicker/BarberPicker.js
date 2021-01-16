import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TimePicker from '../TimePicker/TimePicker';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing.unit,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
    gridItem: {
      flexBasis: 0,
    },
    paper: {
      padding: theme.spacing.unit * 1,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: 300,
      height:55
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
      color: 'white',
      justifyContent: 'center'
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    buttonContainer: {
      float: 'right'
    },
    formControl: {
      minWidth: 190,
      maxWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
  });

class BarberPicker extends Component {
  state = {
    barber: '',
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_ALL_USERS'})
  }

  // handleChangeForBarber = (event) => {
  //     this.setState({
  //       barber: event.target.value})
  //     this.props.dispatch({type: 'FETCH_APT_SLOTS', payload: 
  //       {barber_id: event.target.value, date: this.props.state.dotw}})
  //     console.log('', this.props.state)
  //   }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>Choose a Barber</h2>
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
        {this.props.state.barber !== '' ? <TimePicker state={this.props.state} 
        setTime={this.props.setTime} /> : <p>Please choose a Barber</p>}
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(BarberPicker));