import React, { Component } from 'react';

class EmailField extends Component {
  render() {
    return (
      <div className="input-field">
        <input
          type="email"
          required
          ref={this.props.emailValue}
          onChange={this.props.onChange}
          onFocus={this.props.onFocusEmail}
        />
        <label htmlFor="email">Email:</label>
        {this.props.validation.isEmailErrorVisible
          ? (
            <span className="helper-text red-text">
              {
        this.props.emailValue.current.value.length === 0 ? 'Email не может быть пустым'
          : !this.props.checkEmail ? 'Введите корректный Email'
            : null
      }
            </span>
          )
          : null
    }
      </div>
    );
  }
}

export default EmailField;
