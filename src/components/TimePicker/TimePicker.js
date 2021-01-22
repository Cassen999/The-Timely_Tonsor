import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = (theme) => ({
    root: {
      flexGrow: 1,
      margin: 'auto'
    },
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
    formControl: {
      minWidth: 190,
      maxWidth: 300,
    },
    pickerInstructons: {
      color: 'black',
      // color: '#f5deb3',
      textAlign: 'center',
      backgroundColor: '#a9a9a9',
      borderRadius: 5,
      opacity: '80%',
      width: '60%',
      margin: 'auto',
    }
  });

class TimePicker extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
          <form>
            <h2 className={classes.pickerInstructons}>Please choose a time</h2>
                <Paper className={classes.paper}>
                  <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel>Available Times</InputLabel>
                        <Select
                          value={this.props.state.apt_id}
                          // pass in event and input property for handleChange
                          onChange={(event) => this.props.setTime(event)}
                          >
                              {/* map appointment slots to populate the dropdown */}
                          {this.props.store.aptSlots.map((slot, i) => {
                            return(
                              <MenuItem key={i} value={slot.id}>{slot.start_time}</MenuItem>
                              )
                          })}
                        </Select>
                    </FormControl>
                  </div>
                </Paper>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(TimePicker));