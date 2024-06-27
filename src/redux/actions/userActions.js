import * as UserActionTypes from '../actionType/userActionType';

export const setUser = user => ({
  type: UserActionTypes.SET_USER,
  payload: user,
});
export const setUserToken = token => ({
  type: UserActionTypes.SET_USER_TOKEN,
  payload: token,
});
export const setChatCount = count => ({
  type: UserActionTypes.SET_CHAT_COUNT,
  payload: count,
});
export const logOutUser = () => ({
  type: UserActionTypes.LOGOUT_USER,
});

export const setSignupUser = user => ({
  type: UserActionTypes.SET_SIGNUP_USER,
  payload: user,
});

export const updateSignupUser = user => ({
  type: UserActionTypes.UPDATE_SIGNUP_USER,
  payload: user,
});
