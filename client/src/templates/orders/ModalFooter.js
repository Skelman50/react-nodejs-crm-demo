import React, { Component } from 'react';

class ModalFooter extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const order = {
      list: this.props.orders.map((order) => {
        delete order.id;
        return order;
      }),
    };
    this.props.createPosition(order);
  }

  render() {
    return (
      <div className="modal-footer">
        <button
          disabled={!!this.props.validation.isDisabled}
          onClick={this.props.closeModal}
          className="modal-action waves-effect waves-black btn-flat"
        >
Отмена
        </button>
        <button
          onClick={this.onSubmit}
          disabled={!!(this.props.orders.length === 0 || this.props.validation.isDisabled)}
          className="modal-action btn waves-effect"
        >
Подтвердить
        </button>
      </div>
    );
  }
}

export default ModalFooter;
