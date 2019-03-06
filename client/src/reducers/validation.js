const initialState = {
  isBtnDisabled: true,
  isEmailErrorVisible: false,
  isPasswordErrorVisible: false,
  moreLoad: true,
  isFilterValid: true,
  isBtnVisible: true,
};

export function validation(state = initialState, action) {
  switch (action.type) {
    case 'VALIDATION':
      return action.data;
    default:
      return state;
  }
}
