import React, { Component } from 'react';


class SubmitBtn extends Component {
  render() {
    return (
      <div>
        <button
          onClick={this.props.onSubmit}
          disabled={this.props.validation.isDisabled}
          className="waves-effect waves-light btn"
        >
            Сохранить изменения
        </button>
      </div>
    );
  }
}

export default SubmitBtn;
