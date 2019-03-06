import React, { Component } from 'react';
import MaterialService from '../../services/MeteriaService';

class HistoryTitle extends Component {
  constructor() {
    super();
    this.initTooltip = React.createRef();
    this.materialize = new MaterialService();
    this.isFilterVisible = this.isFilterVisible.bind(this);
  }

  componentDidMount() {
    this.materialize.toolTipInit(this.initTooltip.current);
  }

  isFilterVisible() {
    this.isDisabled = !this.isDisabled;
    this.props.disabled({ ...this.props.validation, isDisabled: this.isDisabled });
  }

  render() {
    return (
      <div className="page-title">
        <h4>История заказов</h4>
        <button
          ref={this.initTooltip}
          onClick={this.isFilterVisible}
          className="btn btn-small"
          data-position="left"
          data-tooltip={!this.props.validation.isDisabled ? 'Открыть фильтр' : 'Закрыть фильтр'}
        >
          <i className="material-icons">filter_list</i>
        </button>
      </div>
    );
  }
}

export default HistoryTitle;
