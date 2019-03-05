import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class AuphLayoutTemplate extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper grey darken-1">
          <Link className="brand-logo" to="/" onClick={this.props.checkClassName}>Newborn</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className={this.props.loginClassName}>
              <Link to="/login" onClick={this.props.checkClassName}>Вход</Link>
            </li>
            <li className={this.props.registerClassname}>
              <Link to="/register" onClick={this.props.checkClassName}>Регистрация</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default AuphLayoutTemplate;
