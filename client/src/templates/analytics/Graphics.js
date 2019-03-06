import React, { Component } from 'react';

class Graphics extends Component {
  render() {
    return (
      <div>
        <div className="average-price">
          <p>
Средний чек
            <strong>
              {this.props.avarage}
              {' '}
грн.
            </strong>
          </p>
        </div>
        <div className="analytics-block pb3">
          <h5>Выручка</h5>
          <canvas ref={this.props.gain} />
        </div>

        <div className="analytics-block">
          <h5>Заказы</h5>
          <canvas ref={this.props.order} />
        </div>
      </div>
    );
  }
}

export default Graphics;
