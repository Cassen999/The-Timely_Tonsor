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
import moment from 'moment';


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

class TimePicker extends Component {
  state = {
    time: ''
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_ALL_USERS'})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
          <form>
            <h2>Please choose a time</h2>
            <Grid item xs={6} className={classes.gridItem}>
                <Paper className={classes.paper}>
                <div>
                    <FormControl className={classes.formControl}>
                    <InputLabel>Available Times</InputLabel>
                        <Select
                            value={this.props.state.time}
                            // pass in event and input property for handleChange
                            onChange={(event) => this.props.setTime(event)}
                            >
                                {/* map genres to populate the dropdown */}
                                {JSON.stringify(this.props.store.aptSlots)}
                            {this.props.store.aptSlots.map((slot) => {
                              return(
                                <MenuItem value={slot.start_time}>{slot.start_time}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    </div>
                </Paper>
            </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(TimePicker));