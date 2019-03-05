import React, { Component } from 'react';

class PositionsFormTitle extends Component {
  render() {
    return (
      <div className="page-subtitle">
        <h4>Позиции:</h4>
        <button
          onClick={this.props.onAddPosition}
          className="waves-effect waves-light btn grey darken-1 btn-small"
        >
            Добавить позицию
        </button>
      </div>
    );
  }
}

export default PositionsFormTitle;
