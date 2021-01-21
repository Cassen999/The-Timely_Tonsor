import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import RegisterBtnStyled from '../RegisterBtnStyled/RegisterBtnStyled'

class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginForm />

        <RegisterBtnStyled />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
