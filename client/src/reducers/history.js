const initialState = [];

export function orderList(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ORDER_LIST':
      return [...state, ...action.orders];
    case 'CLEAR_ORDER_LIST':
      return initialState;
    default:
      return state;
  }
}
