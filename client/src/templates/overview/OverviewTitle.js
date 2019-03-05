import React, { Component } from 'react';
import moment from 'moment';
import MaterialService from '../../services/MeteriaService';

class OverviewTitle extends Component {
  constructor() {
    super();
    this.yesterday = new Date();
    this.openInfo = this.openInfo.bind(this);
    this.tapInit = false;
    this.materialize = new MaterialService();
  }

  componentWillMount() {
    this.date = this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  openInfo() {
    if (!this.tapInit) {
      this.tapTarget = this.materialize.targetInit(this.props.tapTargetInit.current);
      this.tapInit = true;
    }
    this.tapTarget.open();
  }

  render() {
    return (
      <div className="page-title">
        <h4>
            Обзор за вчера (
          {moment(this.date).format('DD.MM.YYYY')}
)
          <i
            onClick={this.openInfo}
            className="material-icons black-text pointer"
          >
info_outline
          </i>
        </h4>
      </div>
    );
  }
}

export default OverviewTitle;
