import React, { Component } from 'react';

class InputField extends Component {
  constructor() {
    super();
    this.touched = 0;
    this.onChange = this.onChange.bind(this);
    this.onFokus = this.onFokus.bind(this);
  }

  onChange() {
    if (this.props.input.current.value.length > 0 && this.props.input.current.value.length < 2) {
      const data = { ...this.props.validation, isDisabled: false };
      this.props.checkValidation(data);
    } else if (this.props.input.current.value.length === 0) {
      const data = { ...this.props.validation, isDisabled: true };
      this.props.checkValidation(data);
    }
  }

  onFokus() {
    if (this.touched < 2) this.touched++;
    const data = { ...this.props.validation, countInput: this.touched };
    this.props.checkValidation(data);
  }

  render() {
    return (
      <div className="input-field">
        <input
          className={this.props.validation.isDisabled && this.props.validation.countInput === 2 ? 'invalid' : null}
          type="text"
          required
          ref={this.props.input}
          onChange={this.onChange}
          onFocus={this.onFokus}
          defaultValue={this.props.match.params.id ? this.props.category.name : ''}
        />
        <label htmlFor="name">Название</label>
        {
                 this.props.validation.isDisabled && this.props.validation.countInput === 2
                   ? <span className="helper-text red-text">Имя категории не может быть пустым</span> : null
               }
      </div>
    );
  }
}

export default InputField;
