import * as UserActionTypes from '../actionType/userActionType';

const initialState = {
  isSignedIn: false,
  userInfo: {},
  userToken: '',
  chatCount: 0,
  signUpUser: {},
  step: 0,
};

const user = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        userInfo: payload,
      };
    case UserActionTypes.SET_USER_TOKEN:
      return {
        ...state,
        userToken: payload,
      };
    case UserActionTypes.SET_CHAT_COUNT:
      return {
        ...state,
        chatCount: payload,
      };
    case UserActionTypes.LOGOUT_USER:
      return {
        userInfo: {},
        userToken: '',
      };
    case UserActionTypes.SET_SIGNUP_USER:
      return {
        ...state,
        signUpUser: payload,
        step: 1,
      };
    case UserActionTypes.UPDATE_SIGNUP_USER:
      return {
        ...state,
        signUpUser: {...state.signUpUser, ...payload},
        step: state.step + 1,
      };
    default:
      return state;
  }
};

export default user;
