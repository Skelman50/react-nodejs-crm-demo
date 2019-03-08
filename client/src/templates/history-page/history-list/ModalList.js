import React, { Component } from 'react';

class ModalList extends Component {
  render() {
    return (
      <div id="order-list" className="modal modal-fixed-footer" ref={this.props.initModal}>
        <div className="modal-content">
          <h4 className="mb1">
Заказ
            {this.props.order.order}
          </h4>
          <Table {...this.props} />
          <div className="order-summary">
            <p>
Общая стоимость
              <strong>
              {' '}
                {this.props.order.list ? this.props.computePrice(this.props.order) : null}
                {' '}
грн.
              </strong>
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={this.props.onCancelModal}
            className="modal-action waves-effect waves-black btn-flat"
          >
Закрыть
          </button>
        </div>
      </div>
    );
  }
}

export default ModalList;


class Table extends Component {
  render() {
    return (
      <table className="highlight">
        <thead>
          <tr>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {this.props.order.list
            ? this.props.order.list.map((list, index) => (
              <tr key={index}>
                <td>{list.name}</td>
                <td>{list.quantity}</td>
                <td>
                  {list.cost}
                  {' '}
грн.
                </td>
              </tr>
            )) : null}

        </tbody>
      </table>
    );
  }
}
