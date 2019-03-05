import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as jwt from 'jsonwebtoken';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuphLayout from '../auth-layout/AuphLayout';
import SiteLayout from '../site-layout/SiteLayout';
import { getUser } from '../../actions/index';
import * as dotenv from 'dotenv'
dotenv.config()

class App extends Component {
  componentWillMount() {
    try {
      const bearer = localStorage.getItem('auth-token');
      if (bearer !== null) {
        const token = bearer.split(' ').splice(1, 1).join(' ');
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        const data = new Date();
        if (decoded.exp > data.getSeconds() / 1000) {
          this.props.userLogin(bearer);
        } else {
          this.props.userLogin(null);
          localStorage.clear();
        }
      }
    } catch (e) {
      this.props.userLogin(null);
      localStorage.clear();
    }
  }

  render() {
    return (
      <Router>
        <Route path="/" component={this.props.user === null ? AuphLayout : SiteLayout} />
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispath => ({
  userLogin: user => dispath(getUser(user)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
