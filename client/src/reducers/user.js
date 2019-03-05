const initialState = null;

export function user(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER':
      return action.token;
    default:
      return state;
  }
}
