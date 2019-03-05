import React, { Component } from 'react';

class CardAction extends Component {
  render() {
    return (
      <div className="card-action">
        <button
          ref={this.props.submitBtn}
          onClick={this.props.onSubmit}
          disabled={this.props.validation.isBtnDisabled}
          className="modal-action btn waves-effect"
        >
          {this.props.click}
        </button>
      </div>
    );
  }
}

export default CardAction;
