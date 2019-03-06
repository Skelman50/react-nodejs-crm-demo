const initialState = false;

export function preload(state = initialState, action) {
  switch (action.type) {
    case 'IS_LOADING':
      return action.preload;
    default:
      return state;
  }
}
