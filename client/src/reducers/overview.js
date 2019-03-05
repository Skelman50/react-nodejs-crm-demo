const initialState = {
  gain: '',
  orders: '',
};

export function overview(state = initialState, action) {
  switch (action.type) {
    case 'GET_OVERVIEW':
      return { ...action.overview };
    default:
      return state;
  }
}
