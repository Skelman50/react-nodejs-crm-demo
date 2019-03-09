import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as jwt from 'jsonwebtoken';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as dotenv from 'dotenv';
import AuphLayout from '../auth-layout/AuphLayout';
import SiteLayout from '../site-layout/SiteLayout';
import { getUser } from '../../actions/index';


dotenv.config();

class App extends Component {
  componentWillMount() {
    this.checkToken(); 
  }

  componentDidUpdate() {
    this.refreshToken();
  }

  checkToken() {
    try {
      const token = localStorage.getItem('auth-token');
      if (token !== null) {
        const decoded = jwt.verify(token, process.env.REACT_APP_SECRET_JWT);
        this.getAccessToken(decoded);
      } else {
        this.noToken();
      }
    } catch (e) {
      this.noToken();
    }
  }

  refreshToken() {
    try {
      const token = this.props.user.split(' ').splice(1, 1).join(' ');
      const decoded = jwt.verify(token, process.env.REACT_APP_SECRET_JWT);
      const data = new Date();
      const timeout = (decoded.exp - data.getTime() / 1000 - 10).toFixed(0);
      setTimeout(() => {
        if (this.props.user !== null) {
          const token = this.props.user.split(' ').splice(1, 1).join(' ');
          const decoded = jwt.verify(token, process.env.REACT_APP_SECRET_JWT);
          if (decoded && token) {
            this.getAccessToken(decoded);
          }
        }
      }, timeout * 1000);
    } catch (e) {
      this.noToken();
    }
  }

  getAccessToken(decoded) {
    return fetch('/api/auth/refresh', {
      method: 'post',
      body: JSON.stringify(decoded),
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.error && res.status !== 200 && !res.token) {
          this.noToken();
        } else {
          localStorage.clear();
          localStorage.setItem('auth-token', res.refreshToken);
          this.props.userLogin(res.token);
        }
      });
  }

  noToken() {
    this.props.userLogin(null);
    localStorage.clear();
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
