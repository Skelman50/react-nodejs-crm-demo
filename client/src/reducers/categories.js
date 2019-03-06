const initialState = [];

export function categories(state = initialState, action) {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return action.categories;
    default:
      return state;
  }
}

export function categoryById(state = {}, action) {
  switch (action.type) {
    case 'GET_CATEGORY_BY_ID':
      return action.category;
    default:
      return state;
  }
}
