import React, { Component } from 'react';

class TapTarget extends Component {
  render() {
    return (
      <div className="tap-target" data-target="menu" ref={this.props.tapTargetInit}>
        <div className="tap-target-content">
          <h5>Зачем нужна эта страница?</h5>
          <p>
Страница “Обзор” покажет динамику продаж за предыдущий день.
                Сравнение со средним значениями поможет вам понять,
                как идут дела у Вашего бизнеса.
          </p>
        </div>
      </div>
    );
  }
}

export default TapTarget;
