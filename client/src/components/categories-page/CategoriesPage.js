import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preloader from '../preloader/Preloader'
import { isLoading, fetchCategories } from '../../actions/index';

import { validationCheck } from '../../actions/index';
import Title from '../../templates/categories-page/Title';
import CategoriesCollection from '../../templates//categories-page/CategoriesCollection';

class CategoriesPage extends Component {
  constructor(props) {
    super(props);

    this.getCategories = this.getCategories.bind(this);
  }

  componentDidMount() {
    this.props.checkValidation({ ...this.props.validation, imagePreview: null, loadImage: null });
    this.props.isLoading(true);
    this.getCategories();
  }

  getCategories() {
    this.props.fetchCategories(this.props.user)
      .then(() => this.props.isLoading(false));
  }


  render() {
    return (
      <div>
        <Title {...this.props} />
        {this.props.preload
          ? <Preloader />
          : <CategoriesCollection {...this.props} />
  }
      </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  preload: state.preload,
  categories: state.categories,
  validation: state.validation,
});

const mapDispatchToProps = dispath => ({
  isLoading: data => dispath(isLoading(data)),
  fetchCategories: user => dispath(fetchCategories(user)),
  checkValidation: data => dispath(validationCheck(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
