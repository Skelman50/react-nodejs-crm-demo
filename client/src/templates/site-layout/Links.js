import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';

class Links extends Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    localStorage.clear();
    this.props.userLogin(null);
    return <Redirect to="/login" />;
  }

  render() {
    return (
      <ul className="sidenav sidenav-fixed a-sidenav">
        <h4>Newborn</h4>

        {this.props.links.map((link, index) => (
          <li key={index} className="bold active"><Link to={link.url} className="waves-effect waves-orange">{link.name}</Link></li>
        ))}

        <li className="bold last"><Link onClick={this.logOut} to="/login" className="waves-effect waves-orange">Выйти</Link></li>
      </ul>
    );
  }
}

export default Links;
