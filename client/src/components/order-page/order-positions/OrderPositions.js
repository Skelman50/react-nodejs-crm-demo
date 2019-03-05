import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  orderId, getPositions, isLoading, orders, updateOrders,
} from '../../../actions/index';
import Preloader from '../../preloader/Preloader';
import MaterialService from '../../../services/MeteriaService';
import PositionsList from '../../../templates/orders/orders-positions/PositionsList';


class OrderPositions extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
    this.materialize = new MaterialService();
  }


  componentDidMount() {
    this.props.isLoading(true);
    this.fetchPositions();
  }


  fetchPositions() {
    this.props.ordersFetch(this.props.user, this.props.orderId)
      .then(() => this.props.isLoading(false));
  }


  render() {
    return (
      <div>
        {!this.props.preload
          ? (
            <div>
              {this.props.positions.length !== 0
                ? <PositionsList {...this.props} />
                : <div className="center">В данный момент позиций нет</div>
      }
            </div>
          )
          : <Preloader />
      }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderId: state.orderId,
  positions: state.positions,
  preload: state.preload,
  user: state.user,
  orders: state.orders.list,
});
const mapDispatchToProps = dispath => ({
  getID: id => dispath(orderId(id)),
  ordersFetch: (user, id) => dispath(getPositions(user, id)),
  isLoading: data => dispath(isLoading(data)),
  pushOrder: order => dispath(orders(order)),
  updateOrders: orders => dispath(updateOrders(orders)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPositions);
