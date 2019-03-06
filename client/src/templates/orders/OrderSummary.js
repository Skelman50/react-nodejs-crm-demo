import React, { Component } from 'react';

class OrderSummary extends Component {
  render() {
    return (
      <div className="order-summary">
        <p>
Общая стоимость
          <strong>
            {this.props.price}
            {' '}
грн.
          </strong>
        </p>
      </div>
    );
  }
}

export default OrderSummary;
