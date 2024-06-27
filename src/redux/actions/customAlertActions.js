import * as customAlertActionTypes from '../actionType/customAlertActionTypes';

export const hideToast = () => ({
  type: customAlertActionTypes.HIDE_TOAST,
});

export const showToast = (text, duration, hasButtons) => ({
  type: customAlertActionTypes.SHOW_TOAST,
  payload: {text, duration, hasButtons},
});
