import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'chart.js';
import { getAnalytics, isLoading } from '../../actions';
import Preloader from '../preloader/Preloader';
import Graphics from '../../templates/analytics/Graphics';


class AnalyticPage extends Component {
  constructor() {
    super();
    this.gain = React.createRef();
    this.order = React.createRef();

    this.gainConfig = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)',
    };

    this.orderConfig = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)',
    };
  }

  componentDidMount() {
    this.getAnalytics()
      .then(() => {
        this.writeAnalytics(this.gain.current, this.createChartConfig, this.gainConfig);
        this.writeAnalytics(this.order.current, this.createChartConfig, this.orderConfig);
      });
  }

  writeAnalytics(canvas, createConfig, config) {
    const ctx = canvas.getContext('2d');
    ctx.canvas.height = '300px';
    new Chart(ctx, createConfig(config));
  }

  createChartConfig({
    labels, data, label, color,
  }) {
    return {
      type: 'line',
      options: {
        responsive: true,
      },
      data: {
        labels,
        datasets: [{
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false,
        }],
      },
    };
  }

  getAnalytics() {
    this.props.isLoading(true);

    return this.props.fetchAnalytics(this.props.user,
      this.gainConfig,
      this.orderConfig)
      .then(() => this.props.isLoading(false));
  }

  render() {
    return (
      <div>
        <div className="page-title">
          <h4>Аналитика</h4>
        </div>
        <div>
          {this.props.preload ? <Preloader />
            : (
              <Graphics
                {...this.props}
                order={this.order}
                gain={this.gain}
              />
            )
  }

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  preload: state.preload,
  avarage: state.analytics.avarage,
  chart: state.analytics.chart,
});
const mapDispatchToProps = dispath => ({
  fetchAnalytics: (user, gainConfig, orderConfig) => dispath(getAnalytics(user, gainConfig, orderConfig)),
  isLoading: data => dispath(isLoading(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticPage);
