import React, { Component } from 'react';

class PositionsFormModal extends Component {
  render() {
    return (
      <div
        className="modal"
        ref={this.props.initModal}
      >
        <div className="modal-content">
          <h4 className="mb1">Добавить позицию</h4>
          <div className="input-field">
            <input
              ref={this.props.name}
              id="pos-name"
              type="text"
              required
            />
            <label htmlFor="pos-name">Название</label>
          </div>
          <div className="input-field">
            <input
              ref={this.props.cost}
              id="pos-cost"
              type="number"
              required
            />
            <label htmlFor="pos-cost">Цена</label>
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={this.props.onCancel}
            className="modal-action waves-effect waves-black btn-flat"
          >
Отмена
          </button>
          <button
            onClick={this.props.onSubmit}
            className="modal-action btn waves-effect"
          >
Сохранить
          </button>
        </div>
      </div>
    );
  }
}

export default PositionsFormModal;
