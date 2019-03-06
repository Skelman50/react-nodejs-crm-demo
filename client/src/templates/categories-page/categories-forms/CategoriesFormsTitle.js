import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MaterialService from '../../../services/MeteriaService';

class CategoriesFormsTitle extends Component {
  constructor() {
    super();
    this.deleteCategory = this.deleteCategory.bind(this);
    this.materialize = new MaterialService();
  }

  deleteCategory() {
    const { id } = this.props.match.params;
    axios.delete(`/api/category/${id}`, {
      headers: {
        Authorization: this.props.user,
      },
    }).then(() => {
      this.materialize.toast('Категория удалена');
      return this.props.history.push('/categories');
    });
  }

  render() {
    return (
      <div className="page-title">
        <h4>
          <Link to="/categories">Категории</Link>
          <i className="material-icons">keyboard_arrow_right</i>
          {this.props.match.params.id ? 'Редактировать' : 'Добавить'}
          {' '}
категорию
        </h4>
        <span>
          {this.props.match.params.id
            ? (
              <button
                onClick={this.deleteCategory}
                className="btn btn-small red"
              >
                <i className="material-icons">delete</i>
              </button>
            ) : null}
        </span>
      </div>
    );
  }
}

export default CategoriesFormsTitle;
