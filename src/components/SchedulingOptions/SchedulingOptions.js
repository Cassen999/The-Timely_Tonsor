import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

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
  }
});

class SchedulingOptions extends Component {
  state = {
    date: '',
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_ALL_USERS'})
    console.log(this.props.store.allUsers)
  }

  handleInputChangeFor = (event) => {
    this.setState({
      date: event.target.value,
    });
  };

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
                  <div className={classes.datePicker}>
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
                    {JSON.stringify(this.state)}
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(SchedulingOptions));;
