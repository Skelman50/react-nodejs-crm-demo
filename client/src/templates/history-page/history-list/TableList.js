import React, { Component } from 'react';
import moment from 'moment';

class TableList extends Component {
  render() {
    return (
      <table className="highlight mb2">
        <Head />
        <tbody>
          {this.props.orderList.map((order, index) => (
            <tr key={index}>
              <td>{order.order}</td>
              <td>{moment(order.date).format('dddd, MMMM DD YYYY')}</td>
              <td>{moment(order.date).format('HH:mm:ss')}</td>
              <td>
                {this.props.computePrice(order)}
                {' '}
грн.
              </td>
              <td>
                <button
                  onClick={() => this.props.onSelectOrder(order)}
                  className="btn btn-small grey darken-1"
                >
                  <i className="material-icons">open_in_new</i>
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    );
  }
}

export default TableList;

class Head extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>№</th>
          <th>Дата</th>
          <th>Время</th>
          <th>Сумма</th>
          <th />
        </tr>
      </thead>
    );
  }
}
