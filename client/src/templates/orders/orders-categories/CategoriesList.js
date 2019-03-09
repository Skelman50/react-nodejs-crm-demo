import React, { Component } from 'react';

class CategoriesList extends Component {
  constructor() {
    super();
    this.redirect = this.redirect.bind(this);
  }

  redirect(category) {
    this.props.history.push(`/order/${category._id}`);
    this.props.getID(category._id);
  }

  render() {
    return (
      <div>
        {this.props.categories.length !== 0
          ? (
            <div className="frow order-row">
              {this.props.categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => this.redirect(category)}
                  className="card waves-effect pointer"
                >
                  <div className="center">
                    <img
                      src={`/${category.imageSrc}`}
                      alt={category.name}
                      className="responsive-img order-img"
                    />
                  </div>
                  <div className="card-content center p10">
                    <h5 className="m0">{category.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          )
          : <div className="center">В данный момент нет категорий</div>}
      </div>
    );
  }
}

export default CategoriesList;
