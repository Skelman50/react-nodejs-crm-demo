import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MaterialService from '../../services/MeteriaService';

class ModalLinks extends Component {
  constructor() {
    super();
    this.floatingInit = React.createRef();
    this.materialize = new MaterialService();
  }

  componentDidMount() {
    this.materialize.floatingInit(this.floatingInit.current);
  }

  render() {
    return (
      <div>
        <div className="fixed-action-btn" ref={this.floatingInit}>
          <div className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </div>
          <ul>
            <li>
              <Link className="btn-floating green" to="/order">
                <i className="material-icons">
                    assignment
                </i>
              </Link>
            </li>
            <li>
              <Link className="btn-floating blue" to="/categories/new">
                <i className="material-icons">
                list
                </i>
              </Link>
            </li>
          </ul>
        </div>
        <div id="menu" className="waves-effect waves-light btn btn-floating"><i className="material-icons">info</i></div>
        <div id="menu" className="waves-effect waves-light btn btn-floating"><i className="material-icons">info</i></div>
      </div>
    );
  }
}

export default ModalLinks;
