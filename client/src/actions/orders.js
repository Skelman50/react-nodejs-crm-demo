import axios from 'axios';

export function orders(order) {
  return {
    type: 'PUSH_ORDER',
    order,
  };
}

export function updateOrders(orders) {
  return {
    type: 'UPDATE_QUANTITY',
    orders,
  };
}

export function removeOrder(order) {
  return {
    type: 'REMOVE_ORDER',
    order,
  };
}

export function ordersClearSuccess() {
  return {
    type: 'ORDERS_CLEAR',
  };
}

export function ordersClear(user, order, modal, toast) {
  return dispatch => (
    axios.post('/api/order', order, {
      headers: {
        Authorization: user,
      },
    })
      .then((res) => {
        modal.close();
        toast.toast(`Заказ №${res.data.order} добавлен`);
        return dispatch(ordersClearSuccess());
      })
  );
}
