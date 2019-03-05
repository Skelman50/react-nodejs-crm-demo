const initialState = {};

export function image(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_IMAGE':
      return action.image;
    default:
      return state;
  }
}
