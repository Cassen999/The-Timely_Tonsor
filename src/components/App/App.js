import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// import ProtectedRouteBarber from '../ProtectedRoute/ProtectedRouteBarber';

import UserLandingPage from '../UserLandingPage/UserLandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import SchedulingOptions from '../SchedulingOptions/SchedulingOptions';
import BarberLandingPage from '../BarberLandingPage/BarberLandingPage';
import AptConfirmation from '../AptConfirmation/AptConfirmation';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    console.log('app checking for barber', this.props.store.user)
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {this.props.store.user.is_barber === true ? <>
            
            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/barber"
              component={BarberLandingPage}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserLandingPage}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/scheduling/:id"
              component={SchedulingOptions}
              authRedirect="/barber"
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/confirm/:id"
              component={AptConfirmation}
              authRedirect="/barber"
            />

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/barber"
            />

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/barber"
            />

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/home"
              component={BarberLandingPage}
              authRedirect="/barber"
            />

            </>: <>
            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/user"
              component={UserLandingPage}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/home"
              component={UserLandingPage}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/scheduling/:id"
              component={SchedulingOptions}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/confirm/:id"
              component={AptConfirmation}
            />

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/user"
            />

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/user"
            />

            </>
            }

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default (connect(mapStoreToProps)(App));
