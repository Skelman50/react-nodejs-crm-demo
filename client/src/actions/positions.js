import axios from 'axios';

export function getPositionsSuccess(positions) {
  return {
    type: 'GET_POSITIONS',
    positions,
  };
}

export function getPositions(user, categoryId) {
  return dispatch => (
    fetch(`/api/position/${categoryId}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: user,
      },
    })
      .then(res => res.json())
      .then((positions) => {
        dispatch(getPositionsSuccess(positions));
      }));
}


export function postPositionsSuccess(position) {
  return {
    type: 'POST_POSITION',
    position,
  };
}

export function postPositions(user, position) {
  return dispatch => (
    axios.post('/api/position', position, {
      headers: {
        Authorization: user,
      },
    })
      .then((pos) => {
        dispatch(postPositionsSuccess(pos.data));
      })
  );
}


export function updatePositionSuccess(positions) {
  return {
    type: 'UPDATE_POSITION',
    positions,
  };
}

export function deletePosition(user, positions, position) {
  return dispatch => (
    axios.delete(`/api/position/${position._id}`, {
      headers: {
        Authorization: user,
      },
    }).then(() => {
      const allPositions = [...positions];
      const newPositions = allPositions.filter(value => value._id !== position._id);
      dispatch(updatePositionSuccess(newPositions));
    })
  );
}

export function updatePosition(user, position, positionId, positions) {
  return dispatch => (
    axios.put(`/api/position/${positionId}`, position, {
      headers: {
        Authorization: user,
      },
    })
      .then((pos) => {
        const allPositions = [...positions];

        const idx = positions.findIndex(p => p._id === pos.data._id);
        allPositions[idx] = pos.data;
        dispatch(updatePositionSuccess(allPositions));
      })
  );
}
