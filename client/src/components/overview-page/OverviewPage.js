import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOverview, isLoading } from '../../actions';
import Preloader from '../preloader/Preloader';

import GainContent from '../../templates/overview/GainContent';
import OrdersContent from '../../templates/overview/OrdersContent';
import TapTarget from '../../templates/overview/TapTarget';
import OverviewTitle from '../../templates/overview/OverviewTitle';

class OverviewPage extends Component {
  constructor() {
    super();
    this.tapTargetInit = React.createRef();
  }

  componentDidMount() {
    this.props.isLoading(true);
    this.props.fetchOverview(this.props.user)
      .then(() => this.props.isLoading(false));
  }


  render() {
    return (
      <div>
        <OverviewTitle
          openInfo={this.openInfo}
          tapTargetInit={this.tapTargetInit}
        />
        <div className="row">
          {this.props.preload ? <Preloader />
            : (
              <div>
                <GainContent {...this.props} />

                <OrdersContent {...this.props} />
              </div>
            )
    }
        </div>
        <TapTarget tapTargetInit={this.tapTargetInit} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  gain: state.overview.gain,
  orders: state.overview.orders,
  preload: state.preload,
});
const mapDispatchToProps = dispath => ({
  fetchOverview: overview => dispath(getOverview(overview)),
  isLoading: data => dispath(isLoading(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
