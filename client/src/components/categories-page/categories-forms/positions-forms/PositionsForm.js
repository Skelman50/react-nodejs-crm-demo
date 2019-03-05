import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getPositions, isLoading, postPositions, updatePosition, deletePosition,
} from '../../../../actions/index';
import MaterialService from '../../../../services/MeteriaService';
import PositionsFormTitle from '../../../../templates/categories-page/categories-forms/positions-forms/PositionsFormTitle';
import PositionsCollections from '../../../../templates/categories-page/categories-forms/positions-forms/PositionsCollections';
import PositionsFormModal from '../../../../templates/categories-page/categories-forms/positions-forms/PositionsFormModal';



class PositionsForm extends Component {
  constructor() {
    super();

    this.initModal = React.createRef();
    this.name = React.createRef();
    this.cost = React.createRef();
    this.positionId = null;
    this.materialize = new MaterialService();
    this.onUpdatePosition = this.onUpdatePosition.bind(this);
    this.onAddPosition = this.onAddPosition.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeletePosition = this.onDeletePosition.bind(this);
  }

  componentDidMount() {
    this.modal = this.materialize.modalInit(this.initModal.current);
    this.props.isLoading(true);
    this.props.positionsFetch(this.props.user, this.props.categoryId).then(() => {
      this.props.isLoading(false);
    });
  }


  onUpdatePosition(position) {
    this.positionId = position._id;
    this.name.current.value = position.name;
    this.cost.current.value = position.cost;
    this.modal.open();
    this.materialize.updateInput(this.name.current, this.cost.current);
  }

  onAddPosition() {
    this.positionId = null;
    this.name.current.value = '';
    this.cost.current.value = '';
    this.modal.open();
  }

  onCancel() {
    this.modal.close();
  }

  onSubmit() {
    const position = {
      name: this.name.current.value,
      cost: +this.cost.current.value,
      category: this.props.categoryId,
    };
    !this.positionId ? this.createPosition(position)
      : this.updatePosition(position);
  }

  updatePosition(position) {
    this.props.updatePosition(this.props.user, position, this.positionId,
      this.props.positions)
      .then(() => {
        this.name.current.value = '';
        this.cost.current.value = '';
        this.materialize.toast('Изменения сохранены');
        this.modal.close();
      });
  }

  onDeletePosition(position) {
    this.props.deletePosition(this.props.user, this.props.positions, position)
      .then(() => {
        this.materialize.toast('Позиция удалена');
        this.modal.close();
      });
  }

  createPosition(position) {
    this.props.createPosition(this.props.user, position)
      .then(() => {
        this.materialize.toast('Позиция создана');
        this.modal.close();
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <PositionsFormTitle
              {...this.props}
              onAddPosition={this.onAddPosition}
            />
            <PositionsCollections
              {...this.props}
              onDeletePosition={this.onDeletePosition}
              onUpdatePosition={this.onUpdatePosition}
            />
          </div>
        </div>
        <PositionsFormModal
          {...this.props}
          onSubmit={this.onSubmit}
          cost={this.cost}
          name={this.name}
          onCancel={this.onCancel}
          initModal={this.initModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  positions: state.positions,
  preload: state.preload,
});

const mapDispatchToProps = dispath => ({
  positionsFetch: (user, categoryId) => dispath(getPositions(user, categoryId)),
  createPosition: (user, position) => dispath(postPositions(user, position)),
  updatePosition: (user, position, positionId, positions) => dispath(updatePosition(user, position, positionId, positions)),
  deletePosition: (user, positions, position) => dispath(deletePosition(user, positions, position)),
  isLoading: data => dispath(isLoading(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionsForm);
