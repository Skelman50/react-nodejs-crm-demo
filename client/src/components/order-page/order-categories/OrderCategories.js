import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isLoading, orderId, fetchCategories } from '../../../actions/index';
import Preloader from '../../preloader/Preloader';
import CategoriesList from '../../../templates/orders/orders-categories/CategoriesList';

class OrderCategories extends Component {
  componentDidMount() {
    this.props.isLoading(true);
    this.getCategories();
    this.props.getID(null);
  }


  getCategories() {
    this.props.fetchCategories(this.props.user)
      .then(() => this.props.isLoading(false));
  }

  render() {
    return (
      <div>
        {!this.props.preload
          ? <CategoriesList {...this.props} />
          : <Preloader />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  preload: state.preload,
  categories: state.categories,
  validation: state.validation,
  orderId: state.orderId,
});

const mapDispatchToProps = dispath => ({
  isLoading: data => dispath(isLoading(data)),
  fetchCategories: user => dispath(fetchCategories(user)),
  getID: id => dispath(orderId(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(OrderCategories);
