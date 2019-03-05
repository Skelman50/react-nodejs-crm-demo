const initialState = [];

export function positions(state = initialState, action) {
  switch (action.type) {
    case 'GET_POSITIONS':
      return action.positions;
    case 'POST_POSITION':
      return [...state, action.position];
    case 'UPDATE_POSITION':
      return action.positions;
    default:
      return state;
  }
}
