const initialState = null;

export function orderId(state = initialState, action) {
  switch (action.type) {
    case 'ORDER_ID':
      return action.id;
    default:
      return state;
  }
}
