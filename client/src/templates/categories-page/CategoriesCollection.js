import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoriesCollection extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="collection">
            {
               this.props.categories.length === 0
                 ? <div className="center">Категорий нет</div>
                 : this.props.categories.map((category, index) => (
                   <Link
                     onClick={() => { this.props.checkValidation({ ...this.props.validation, inputName: category.name }); }
                  }
                     to={`/categories/${category._id}`}
                     className="collection-item"
                     key={index}
                   >
                     {category.name}
                   </Link>
                 ))
          }
          </div>
        </div>
      </div>
    );
  }
}

export default CategoriesCollection;
