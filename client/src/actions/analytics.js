import axios from 'axios';

export function getAnalyticsSuccess(analytics) {
  return {
    type: 'GET_ANALYTICS',
    analytics,
  };
}

export function getAnalytics(user, gainConfig, orderConfig) {
  return dispatch => (
    axios.get('/api/analytics/analytics', {
      headers: {
        Authorization: user,
      },
    })
      .then((res) => {
        gainConfig.labels = res.data.chart.map(item => item.label);
        gainConfig.data = res.data.chart.map(item => item.gain);
        orderConfig.labels = res.data.chart.map(item => item.label);
        orderConfig.data = res.data.chart.map(item => item.order);
        dispatch(getAnalyticsSuccess(res.data));
      })
  );
}
