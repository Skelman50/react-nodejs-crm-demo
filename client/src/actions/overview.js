import axios from 'axios';

export function getOverviewSuccess(overview) {
  return {
    type: 'GET_OVERVIEW',
    overview,
  };
}

export function getOverview(user) {
  return dispatch => (
    axios.get('/api/analytics/overview', {
      headers: {
        Authorization: user,
      },
    })
      .then((res) => {
        dispatch(getOverviewSuccess(res.data));
      })
  );
}
