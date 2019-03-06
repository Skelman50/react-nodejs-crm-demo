import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  orderId, removeOrder, ordersClear, validationCheck,
} from '../../actions/index';

import OrderPageTitle from '../../templates/orders/OrderPageTitle';
import OrderPageTable from '../../templates/orders/OrdersPageTable';
import ModalFooter from '../../templates/orders/ModalFooter';
import MaterialService from '../../services/MeteriaService';
import OrderSummary from '../../templates/orders/OrderSummary';

class OrderPage extends Component {
  constructor(props) {
    super(props);

    this.initModal = React.createRef();
    this.materialize = new MaterialService();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.removePosition = this.removePosition.bind(this);
    this.createPosition = this.createPosition.bind(this);
  }

  componentDidMount() {
    this.props.disabled({ ...this.props.validation, isDisabled: false });
    this.modal = this.materialize.modalInit(this.initModal.current);
  }

  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }

  removePosition(order) {
    this.props.removePosition(order);
  }

  createPosition(order) {
    this.props.disabled({ ...this.props.validation, isDisabled: true });
    this.props.clearOrders(this.props.user, order, this.modal, this.materialize)
      .then(() => {
        this.props.disabled({ ...this.props.validation, isDisabled: false });
      });
  }


  render() {
    return (
      <div>
        <OrderPageTitle
          {...this.props}
          openModal={this.openModal}
        />
        <div
          ref={this.initModal}
          className="modal modal-fixed-footer"
        >
          <div className="modal-content">
            <h4 className="mb1">Ваш заказ</h4>
            <OrderPageTable {...this.props} />
            <OrderSummary {...this.props} />
          </div>
          <ModalFooter
            {...this.props}
            createPosition={this.createPosition}
            closeModal={this.closeModal}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  orderId: state.orderId,
  orders: state.orders.list,
  price: state.orders.price,
  user: state.user,
  validation: state.validation,
});
const mapDispatchToProps = dispath => ({
  getID: id => dispath(orderId(id)),
  removePosition: order => dispath(removeOrder(order)),
  clearOrders: (user, order, modal, toast) => dispath(ordersClear(user, order, modal, toast)),
  disabled: data => dispath(validationCheck(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
