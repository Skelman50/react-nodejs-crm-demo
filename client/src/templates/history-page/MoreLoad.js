import React, { Component } from 'react';

class MoreLoad extends Component {
  render() {
    return (
      <div
        style={{
          display: this.props.validation.isDisabled || this.props.orderList.length === 0 ? 'none' : 'block',
        }}
        className="center mb2"
      >
        <button
          onClick={this.props.loadMore}
          className="btn waves-effect grey darken-1 btn-small"
        >
Загрузить еще
        </button>
      </div>
    );
  }
}

export default MoreLoad;
