import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import LoginPage from '../login-page/LoginPage';
import RegistrationPage from '../registration-page/RegistrationPage';
import { isActive } from '../../actions';
import AuphLayoutTemplate from '../../templates/auth-layout/AuphLayoutTemplate';

class AuphLayout extends Component {
  constructor() {
    super();

    this.location = true;
    this.checkClassName = this.checkClassName.bind(this);
  }

  componentDidMount() {
    if (this.props.location.pathname === '/register') {
      return this.props.isActive({
        registerClassname: 'active',
      });
    }
    return this.props.isActive({
      loginClassName: 'active',
    });
  }

  checkClassName(e) {
    if (e.target.text === 'Newborn' || e.target.text === 'Вход') {
      this.props.isActive({
        loginClassName: 'active',
      });
    } else {
      this.props.isActive({
        registerClassname: 'active',
      });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <AuphLayoutTemplate {...this.props} checkClassName={this.checkClassName} />
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegistrationPage} />
            <Redirect from="*" to="/login" />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  loginClassName: state.activeLinks.loginClassName,
  registerClassname: state.activeLinks.registerClassname,
});
const mapDispatchToProps = dispath => ({
  isActive: links => dispath(isActive(links)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuphLayout);
