import React, { Component } from 'react';

class OrderPageTable extends Component {
  render() {
    return (
      <table className="highlight">
        <thead>
          <tr>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.orders.map((order, index) => (
            <tr key={index}>
              <td>{order.name}</td>
              <td>{order.quantity}</td>
              <td>
                {order.cost}
                {' '}
грн.
              </td>
              <td>
                <i
                  onClick={() => this.props.removePosition(order)}
                  className="material-icons pointer"
                >
delete
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default OrderPageTable;
