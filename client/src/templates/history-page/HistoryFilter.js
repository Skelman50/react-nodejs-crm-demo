import React, { Component } from 'react';
import axios from 'axios';
import MaterialService from '../../services/MeteriaService';


class HistoryFilter extends Component {
  constructor(props) {
    super(props);

    this.orderNumber = React.createRef();
    this.initStart = React.createRef();
    this.initEnd = React.createRef();
    this.materialize = new MaterialService();
    this.validateDate = this.validateDate.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  fetchOrderList(params, user) {
    axios.get('/api/order', {
      headers: {
        Authorization: user,
      },
      params,
    })
      .then((res) => {
        this.props.fetchOrdersList(res.data);
        this.props.isLoading(false);
        if (res.data.length < this.STEP) {
          this.props.disabled({ ...this.props.validation, moreLoad: false });
        }
      });
  }


  validateDate() {
    if (this.end.date && this.start.date && this.orderNumber.current.value === '') {
      this.valid = this.start < this.end;
      this.params = { ...{}, start: this.start.date, end: this.end.date };
      return this.props.disabled({ ...this.props.validation, isFilterValid: this.valid });
    }
    if (!this.end.date && !this.start.date && +this.orderNumber.current.value > 0) {
      this.params = { ...{}, order: this.orderNumber.current.value };
      return this.props.disabled({ ...this.props.validation, isFilterValid: true });
    }
    if (!this.end.date && !this.start.date && this.orderNumber.current.value === '') {
      this.params = { ...this.props.params, offset: 0, limit: 0 };
      return this.props.disabled({ ...this.props.validation, isFilterValid: true });
    }
    return this.props.disabled({ ...this.props.validation, isFilterValid: false });
  }

  applyFilter() {
    this.props.isLoading(true);
    this.props.clearOrdersList();
    this.fetchOrderList(this.params, this.props.user);
    this.props.disabled({ ...this.props.validation, isBtnVisible: false });
  }

  componentDidMount() {
    this.end = this.materialize.datePickeInit(this.initEnd.current, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose: this.validateDate,
    });
    this.start = this.materialize.datePickeInit(this.initStart.current, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose: this.validateDate,
    });
  }


  render() {
    return (
      <div
        style={{ display: !this.props.validation.isDisabled ? 'none' : 'block' }}
        className="filter"
      >
        <div className="fr">
          <div className="col order">
            <div className="input-field inline order-position-input">
              <input type="number" id="number" ref={this.orderNumber} onChange={this.validateDate} />
              <label htmlFor="number">Номер заказа</label>
            </div>
          </div>
          <div className="col filter-pickers">
            <div className="input-field">
              <input type="text" ref={this.initStart} />
              <label>Начало</label>
            </div>

            <div className="input-field">
              <input type="text" ref={this.initEnd} />
              <label>Конец</label>
            </div>
          </div>
        </div>
        <button
          disabled={!this.props.validation.isFilterValid}
          onClick={this.applyFilter}
          className="btn waves-effect wavers-light btn-small"
        >
Применить фильтр
        </button>
      </div>
    );
  }
}


export default HistoryFilter;
