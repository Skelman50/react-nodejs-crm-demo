import React, { Component } from 'react';

import { connect } from 'react-redux';
import axios from 'axios';
import HistoryList from './history-list/HistoryList';
import { validationCheck, isLoading, loadMorePreload } from '../../actions/index';
import { getOrdersList, clearOrdersList } from '../../actions/history';
import Preloader from '../preloader/Preloader';
import HistoryTitle from '../../templates/history-page/HistoryTitle';
import MoreLoad from '../../templates/history-page/MoreLoad';
import HistoryFilter from '../../templates/history-page/HistoryFilter';

class HistoryPage extends Component {
  constructor(props) {
    super(props);

    this.initTooltip = React.createRef();
    this.loadMore = this.loadMore.bind(this);
    this.STEP = 2;

    this.params = {
      offset: 0,
      limit: this.STEP,
    };
  }

  componentDidMount() {
    this.props.isLoading(true);
    this.props.disabled({
      ...this.props.validation, isDisabled: false, moreLoad: true, isBtnVisible: true,
    });
    this.fetchOrderList(this.params, this.props.user);
  }

  componentWillUnmount() {
    this.props.clearOrdersList();
  }

  fetchOrderList(params, user) {
    axios.get('/api/order', {
      headers: {
        Authorization: user,
      },
      params,
    })
      .then((res) => {
        this.props.fetchOrdersList(res.data);
        this.props.isLoading(false);
        this.props.isLoadMore(false);
        if (res.data.length < this.STEP) {
          this.props.disabled({ ...this.props.validation, moreLoad: false });
        }
      });
  }


  loadMore() {
    this.props.isLoadMore(true);
    this.params.offset += this.STEP;
    this.fetchOrderList(this.params, this.props.user);
  }

  render() {
    return (
      <div>
        <HistoryTitle {...this.props} />
        <HistoryFilter
          {...this.props}
          params={this.params}
          fetchOrderList={this.fetchOrderList}
        />

        {this.props.preload ? <Preloader />
          : (
            <div>
              {this.props.orderList.length === 0
                ? <div className="center">Заказов нет</div>
                : <HistoryList orderList={this.props.orderList} />
}
              {!this.props.loadMorePreload
                ? <MoreLoad loadMore={this.loadMore} {...this.props} />
                : <Preloader />
}
            </div>
          )
}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  validation: state.validation,
  orderList: state.orderList,
  preload: state.preload,
  loadMorePreload: state.loadMorePreload,

});
const mapDispatchToProps = dispath => ({
  disabled: data => dispath(validationCheck(data)),
  fetchOrdersList: orders => dispath(getOrdersList(orders)),
  isLoading: data => dispath(isLoading(data)),
  clearOrdersList: () => dispath(clearOrdersList()),
  isLoadMore: data => dispath(loadMorePreload(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
