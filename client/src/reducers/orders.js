const initialState = {
  list: [],
  price: 0,
};

export function orders(state = initialState, action) {
  switch (action.type) {
    case 'PUSH_ORDER':
      return {
        list: [...state.list, action.order],
        price: state.price + action.order.cost * action.order.quantity,
      };
    case 'UPDATE_QUANTITY':
      return {
        list: [...action.orders],
        price: state.list.reduce((total, order) => total + order.cost * order.quantity, 0),
      };
    case 'REMOVE_ORDER':
      return {
        list: state.list.filter(order => order.id !== action.order.id),
        price: state.list.filter(order => order.id !== action.order.id).reduce((total, order) => total + order.cost * order.quantity, 0),
      };
    case 'ORDERS_CLEAR':
      return initialState;
    default:
      return state;
  }
}
