import React, { Component } from 'react';

class Title extends Component {
  render() {
    return (
      <div className="page-title">
        <h4>Категории</h4>
        <button
          onClick={() => {
            this.props.history.push('/categories/new');
          }}
          className="waves-effect waves-light btn grey darken-1"
        >
      Добавить категорию
        </button>
      </div>
    );
  }
}

export default Title;
