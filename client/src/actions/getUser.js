export function getUser(token) {
  return {
    type: 'GET_USER',
    token,
  };
}

export function userLogin(user, materialize, redirect) {
  return dispatch => fetch('/api/auth/login', {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((res) => {
      if (res.error && res.status !== 200 && !res.token) {
        materialize.toast(res.error);
      } else {
        dispatch(getUser(res.token));
        localStorage.setItem('auth-token', res.refreshToken);
        return redirect.push('/overview');
      }
    });
}

export function userRegister(user, materialize, redirect) {
  return fetch('/api/auth/register', {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        console.log(res);
        materialize.toast(res.error);
      } else {
        materialize.toast('Теперь можете войти в систему');
        return redirect.push('/login');
      }
    });
}
