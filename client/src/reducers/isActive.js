const initialState = {
  loginClassName: 'active',
  registerClassname: null,
};

export function activeLinks(state = initialState, action) {
  switch (action.type) {
    case 'CHECK_LINKS':
      return action.links;
    default:
      return state;
  }
}
