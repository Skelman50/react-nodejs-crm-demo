import React, { Component } from 'react';

class OrdersContent extends Component {
  render() {
    return (
      <div className="col s12 l6">
        <div className="card orange lighten-2 white-text">
          <div className="card-content">
            <span className="card-title">Заказы:</span>
            <h3>
              {this.props.orders.yesterday}
              {' '}
зак.
            </h3>
            <h3
              className={this.props.orders.isHigher ? 'green-text text-darket-2 m0 mb1' : 'red-text m0 mb1'}
            >
              <i className="material-icons">
                {this.props.orders.isHigher ? 'arrow_upward' : 'arrow_downward'}
              </i>
              {this.props.orders.percent}
%
            </h3>
            <p>
Число заказов вчера на
              {this.props.orders.percent}
%
              {this.props.orders.isHigher ? ' выше ' : ' ниже '}
                среднего значения:
              {' '}
              {this.props.orders.compare}
              {' '}
зак. в день
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default OrdersContent;
