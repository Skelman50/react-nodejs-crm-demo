const initialState = false;

export function loadMorePreload(state = initialState, action) {
  switch (action.type) {
    case 'IS_LOADING_MORE':
      return action.preload;
    default:
      return state;
  }
}
