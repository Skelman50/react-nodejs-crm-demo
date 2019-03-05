import React, { Component } from 'react';
import MaterialService from '../../../services/MeteriaService';

class PositionsList extends Component {
  constructor() {
    super();

    this.materialize = new MaterialService();
    this.onAdd = this.onAdd.bind(this);
  }


  onAdd(position, ref) {
    if (ref.current.value < 1) {
      this.materialize.toast('Количество не может быть меньше 1');
    } else {
      const orderPosition = {
        ...{},
        name: position.name,
        cost: position.cost,
        quantity: +ref.current.value,
        id: position._id,
      };
      const ordersList = [...this.props.orders];
      const candidate = ordersList.find(p => p.id === position._id);
      if (candidate) {
        candidate.quantity += orderPosition.quantity;
        this.props.updateOrders(ordersList);
      } else {
        this.props.pushOrder(orderPosition);
      }
      this.materialize.toast(`Добавлено ${orderPosition.quantity} позиций`);
    }
  }

  render() {
    return (
      <table className="highlight">
        <Thead />
        <tbody>
          {this.props.positions.map((position, index) => (
            <tr key={index}>
              <td>{position.name}</td>
              <td>
                {position.cost}
                {' '}
грн.
              </td>
              <td>
                <div className="input-field inline order-position-input">
                  <input
                    ref={this[position._id] = React.createRef()}
                    type="number"
                    defaultValue="1"
                    min="1"
                  />
                </div>
              </td>
              <td>
                <button
                  onClick={() => this.onAdd(position, this[position._id])}
                  className="btn waves-effect wavers-light btn-small"
                >
Добавить
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    );
  }
}

export default PositionsList;

class Thead extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Название</th>
          <th>Стоимость</th>
          <th>Количество</th>
        </tr>
      </thead>
    );
  }
}
