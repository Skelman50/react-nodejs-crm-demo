export function getOrdersList(orders) {
  return {
    type: 'FETCH_ORDER_LIST',
    orders,
  };
}

export function clearOrdersList() {
  return {
    type: 'CLEAR_ORDER_LIST',
  };
}
