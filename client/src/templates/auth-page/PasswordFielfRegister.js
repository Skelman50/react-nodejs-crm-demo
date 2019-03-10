import React, { Component } from 'react';

class PasswordFieldRegister extends Component {
  render() {
    return (
      <div className="input-field">
        <input
          type="password"
          required
          ref={this.props.passwordValue}
          onChange={this.props.onChange}
          onFocus={this.props.onFocusPassword}
        />
        <label htmlFor="password">Пароль:</label>
        {this.props.validation.isPasswordErrorVisible
          ? (
            <span className="helper-text red-text">
              {
    this.props.passwordValue.current !== null ?
        this.props.passwordValue.current.value.length === 0 ? 'пароль не может быть пустым'
          : this.props.passwordValue.current.value.length < 6 && this.props.passwordValue.current.value.length > 0 ? 'Минимум 6 символов'
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

export default PasswordFieldRegister;