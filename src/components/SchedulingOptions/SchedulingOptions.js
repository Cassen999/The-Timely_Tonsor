import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    color: 'white'
  },
});

class SchedulingOptions extends Component {
  state = {
    date: '',
  };

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
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(SchedulingOptions));;
