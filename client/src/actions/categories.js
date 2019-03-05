export function apiCategories(categories) {
  return {
    type: 'GET_CATEGORIES',
    categories,
  };
}

export function fetchCategories(user) {
  return dispatch => fetch('/api/category', {
    method: 'get',
    headers: {
      Authorization: user,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(categories => dispatch(apiCategories(categories)));
}

export function getCategory(category) {
  return {
    type: 'GET_CATEGORY_BY_ID',
    category,
  };
}

export function getCategoryById(id, user) {
  return dispatch => fetch(`/api/category/${id}`, {
    method: 'get',
    headers: {
      Authorization: user,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }).then(res => res.json())
    .then(category => dispatch(getCategory(category)));
}
