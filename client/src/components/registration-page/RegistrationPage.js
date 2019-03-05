import React, { Component } from 'react';

import { connect } from 'react-redux';
import { validationCheck, userRegister, isActive } from '../../actions/index';
import MaterialService from '../../services/MeteriaService';
import EmailField from '../../templates/auth-page/EmailField';
import PasswordField from '../../templates/auth-page/PasswordField';
import CardAction from '../../templates/auth-page/CardAction';

class RegistrationPage extends Component {
  constructor() {
    super();

    this.emailValue = React.createRef();
    this.passwordValue = React.createRef();
    this.redExpEmail = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    this.countFocusEmail = 0;
    this.countFocusPassword = 0;

    this.materialize = new MaterialService();
    this.onChange = this.onChange.bind(this);
    this.onFocusEmail = this.onFocusEmail.bind(this);
    this.onFocusPassword = this.onFocusPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onChange() {
    this.checkEmail = this.redExpEmail.test(this.emailValue.current.value);

    if (this.passwordValue.current.value.length >= 6 && this.checkEmail) {
      return this.props.checkValidation({
        ...this.props.validation,
        isBtnDisabled: false,
      });
    }
    return this.props.checkValidation({
      ...this.props.validation,
      isBtnDisabled: true,
    });
  }

  onFocusEmail() {
    this.countFocusEmail += 1;

    if (!this.checkEmail && this.countFocusEmail >= 2) {
      return this.props.checkValidation({
        ...this.props.validation,
        isEmailErrorVisible: true,
      });
    }
    return this.props.checkValidation({
      ...this.props.validation,
      isEmailErrorVisible: false,
    });
  }

  onFocusPassword() {
    this.countFocusPassword += 1;

    if (this.passwordValue.current.value.length < 6
        && this.countFocusPassword >= 2) {
      return this.props.checkValidation({
        ...this.props.validation,
        isPasswordErrorVisible: true,
      });
    }
    return this.props.checkValidation({
      ...this.props.validation,
      isPasswordErrorVisible: false,
    });
  }

  onSubmit() {
    this.props.checkValidation({
      ...this.props.validation,
      isBtnDisabled: true,
    });
    const user = {
      email: this.emailValue.current.value,
      password: this.passwordValue.current.value,
    };
    userRegister(user, this.materialize, this.props.history)
      .then(() => {
        this.props.checkValidation({
          ...this.props.validation,
          isBtnDisabled: false,
        });
        this.props.isActive({
          loginClassName: 'active',
          registerClassname: null,
        });
      });
  }

  render() {
    return (
      <div
        className="auth-block"
      >
        <div
          className="card"
        >
          <div className="card-content">
            <span className="card-title">Cоздать аккаунт</span>
            <EmailField
              {...this.props}
              checkEmail={this.checkEmail}
              onFocusEmail={this.onFocusEmail}
              emailValue={this.emailValue}
              onChange={this.onChange}
              countFocusEmail={this.countFocusEmail}
            />

            <PasswordField
              {...this.props}
              onFocusPassword={this.onFocusPassword}
              passwordValue={this.passwordValue}
              onChange={this.onChange}
              countFocusPassword={this.countFocusPassword}
            />

          </div>
          <CardAction {...this.props} onSubmit={this.onSubmit} click="Создать" />
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  validation: state.validation,
});

const mapDispatchToProps = dispath => ({
  checkValidation: data => dispath(validationCheck(data)),
  isActive: links => dispath(isActive(links)),
});


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
