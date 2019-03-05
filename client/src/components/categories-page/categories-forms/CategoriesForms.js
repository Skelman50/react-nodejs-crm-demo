import React, { Component } from 'react';
import { connect } from 'react-redux';
import PositionsForm from './positions-forms/PositionsForm';

import { validationCheck, getCategoryById, showImage } from '../../../actions/index';

import MaterialService from '../../../services/MeteriaService';
import { getCategory } from '../../../actions/categories';
import CategoriesFormsTitle from '../../../templates/categories-page/categories-forms/CategoriesFormsTitle';
import InputField from '../../../templates/categories-page/categories-forms/InputField';
import LoadFile from '../../../templates/categories-page/categories-forms/LoadFile'
import SubmitBtn from '../../../templates/categories-page/categories-forms/SubmitBtn';
import ImageView from '../../../templates/categories-page/categories-forms/ImageView';

class CategoriesForms extends Component {
  constructor() {
    super();

    this.materialize = new MaterialService();
    this.input = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getCategoryById(this.props.match.params.id, this.props.user)
        .then((category) => {
          this.props.checkValidation({ ...this.props.validation, isDisabled: false });
          this.props.showImage({ imagePreview: null, loadImage: category.category.imageSrc });
          this.materialize.updateInput(this.input.current);
        });
    } else {
      this.props.checkValidation({ ...this.props.validation, isDisabled: true });
      this.props.showImage({});
    }
  }

  componentWillUnmount() {
    this.props.resetCategory({});
    this.props.showImage({});
  }


  createCategory(name, image) {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);

    fetch('/api/category', {
      method: 'post',
      body: fd,
      headers: {
        Authorization: this.props.user,
      },
    })
      .then(() => this.materialize.toast('Данные сохранились'));
  }

  updateCategory(id, name, image) {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    fetch(`/api/category/${id}`, {
      method: 'put',
      body: fd,
      headers: {
        Authorization: this.props.user,
      },
    })
      .then(() => this.materialize.toast('Данные обновились'));
  }

  onSubmit() {
    if (!this.props.match.params.id) {
      this.createCategory(this.input.current.value, this.props.image.file);
    } else {
      this.updateCategory(this.props.match.params.id, this.input.current.value, this.props.image.file);
    }
  }

  render() {
    return (
      <div>
        <CategoriesFormsTitle {...this.props} />

        <div className="row">
          <div className="col s12 l6">
            <InputField {...this.props} input={this.input} />
            <LoadFile {...this.props} />
            <SubmitBtn {...this.props} onSubmit={this.onSubmit} createCategory={this.createCategory} updateCategory={this.updateCategory} />
          </div>
          <ImageView {...this.props} />
        </div>
        {this.props.match.params.id
          ? <PositionsForm categoryId={this.props.match.params.id} user={this.props.user} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  validation: state.validation,
  user: state.user,
  category: state.categoryById,
  categories: state.categories,
  preload: state.preload,
  image: state.image,
});

const mapDispatchToProps = dispath => ({
  checkValidation: data => dispath(validationCheck(data)),
  getCategoryById: (id, user) => dispath(getCategoryById(id, user)),
  resetCategory: category => dispath(getCategory(category)),
  showImage: image => dispath(showImage(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesForms);
