import * as customAlertActionTypes from '../actionType/customAlertActionTypes';
const initialState = {
  visible: false,
  text: '',
  duration: 2000,
  hasButtons: false,
};

const customAlert = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case customAlertActionTypes.SHOW_TOAST: {
      return {
        ...state,
        visible: true,
        text: payload.text,
        duration: payload.duration ? payload.duration : 2500,
        hasButtons: payload.hasButtons ? payload.hasButtons : false,
      };
    }

    case customAlertActionTypes.HIDE_TOAST: {
      return {
        ...state,
        visible: false,
        text: '',
        hasButtons: false,
      };
    }
    default:
      return state;
  }
};

export default customAlert;
