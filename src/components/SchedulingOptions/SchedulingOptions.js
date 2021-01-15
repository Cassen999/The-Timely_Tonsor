import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

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
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 300,
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
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  selectEmpty: {
      marginTop: theme.spacing.unit * 2,
  },
});

class SchedulingOptions extends Component {
  state = {
    date: '',
    time: '',
    barber: ''
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_ALL_USERS'})
    this.props.dispatch({type: 'FETCH_APT_SLOTS'})
    this.props.dispatch({type: 'FETCH_BARBERS'})
    console.log(this.props.store.allUsers)
    console.log(this.props.store.aptSlots)
    console.log(this.props.store.barbers)
  }

  handleInputChangeFor = (event) => {
    this.setState({
      date: event.target.value,
    });
    const options = {weekday: 'long'};
    let day = new Intl.DateTimeFormat('en-US', options).format(this.state.date);

  };

  handleChangeForBarber = (event) => {
    this.setState({
      barber: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    return (
    <div>
      <h2>Please schedule your appointment below</h2>
        {JSON.stringify(this.props.store.user)}
      <h3>Choose preferred date</h3>
        <form onSubmit={this.selectDate} className={classes.container} noValidate>
          <div className={classes.root}>
            <Grid container spacing={6}
              alignItems="center"
              justify="center">
              <Grid item xs={6} className={classes.gridItem}>
                <Paper className={classes.paper}>
                  {/* <div className={classes.datePicker}> */}
                    <TextField
                      id="date"
                      label="Select a Date"
                      type="date"
                      value={this.state.date}
                      onChange={this.handleInputChangeFor}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    {JSON.stringify(this.state)}
                  {/* </div> */}
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Barbers</InputLabel>
                      <Select
                          value={this.state.barber}
                          // pass in event and input property for handleChange
                          onChange={(event) => this.handleChangeForBarber(event)}
                          >
                              {/* map genres to populate the dropdown */}
                          {this.props.store.barbers.map((barber) => {
                              return(
                                  <MenuItem value={barber.first_name}>{barber.first_name}</MenuItem>
                              )
                          })}
                      </Select>
                    </FormControl>
                </div>
              </Paper>
            </Grid>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(SchedulingOptions));;
