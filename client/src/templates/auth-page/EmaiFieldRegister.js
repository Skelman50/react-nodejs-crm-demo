import React, { Component } from 'react';

class EmailFieldRegister extends Component {
  render() {
    return (
      <div className="input-field">
        <input
          type="email"
          required
          ref={this.props.emailValueRegister}
          onChange={this.props.onChange}
          onFocus={this.props.onFocusEmail}
        />
        <label htmlFor="email">Email:</label>
        {this.props.validation.isEmailErrorVisible
          ? (
            <span className="helper-text red-text">
              {
    this.props.emailValueRegister.current !== null ?   
        this.props.emailValueRegister.current.value.length === 0 ? 'Email не может быть пустым'
          : !this.props.checkEmail ? 'Введите корректный Email'
            : null
            :null
      }
            </span>
          )
          : null
    }
      </div>
    );
  }
}

export default EmailFieldRegister;