import React, { Component } from 'react';


import TableList from '../../../templates/history-page/history-list/TableList';
import MaterialService from '../../../services/MeteriaService';
import ModalList from '../../../templates/history-page/history-list/ModalList';

class HistoryList extends Component {
  constructor(props) {
    super(props);
    this.materialize = new MaterialService();
    this.initModal = React.createRef();
    this.onSelectOrder = this.onSelectOrder.bind(this);
    this.onCancelModal = this.onCancelModal.bind(this);

    this.order = {};
  }

  componentDidMount() {
    this.modal = this.materialize.modalInit(this.initModal.current);
  }

  onSelectOrder(order) {
    this.order = { ...order };
    this.modal.open();
    this.forceUpdate();
  }

  onCancelModal() {
    this.modal.close();
  }

  computePrice(order) {
    return order.list.reduce((total, current) => total + current.cost * current.quantity, 0);
  }


  render() {
    return (
      <div>
        <TableList
          {...this.props}
          onSelectOrder={this.onSelectOrder}
          computePrice={this.computePrice}
        />
        <ModalList
          {...this.props}
          computePrice={this.computePrice}
          onCancelModal={this.onCancelModal}
          order={this.order}
          initModal={this.initModal}
        />
      </div>
    );
  }
}

export default HistoryList;
