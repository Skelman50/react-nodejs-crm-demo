const initialState = {};

export function analytics(state = initialState, action) {
  switch (action.type) {
    case 'GET_ANALYTICS':
      return { ...action.analytics };
    default:
      return state;
  }
}
