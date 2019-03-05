import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrderPageTitle extends Component {
  render() {
    return (
      <div className="page-title">
        {!this.props.orderId
          ? <h4>Заказ</h4>
          : (
            <h4>
              <Link to="/order">Заказ</Link>
              <i className="material-icons">keyboard_arrow_right</i>
         Добавить продукцию
            </h4>
          )
        }
        <button
          disabled={this.props.orders.length === 0}
          onClick={this.props.openModal}
          className="waves-effect btn grey darken-1"
        >
               Завершить
        </button>
      </div>
    );
  }
}

export default OrderPageTitle;
