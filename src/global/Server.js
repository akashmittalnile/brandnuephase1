//import : axios
import axios from 'axios';
import {Alert} from 'react-native';
//import : base URL
// export const BASE_URL=`https://www.nileprojects.in/brandnue/`;
// export const BASE_URL = `https://staging.brandnueweightloss.com/`;
export const BASE_URL = `https://admin.brandnueweightloss.com/`;
//export const BASE_URL = `https://dev.brandnueweightloss.com/`;

//endpoints
export const SIGN_UP = `api/v1/customer/register`;
export const LOGIN = `api/v1/customer/login`;
export const LOGOUT = `api/v1/logout`;
export const PROFILE = `api/v1/profile`;
export const UPDATE_PROFILE = `api/v1/profile/update`;
export const HOME_PAGE = `api/v1/home-page`;
export const CHART_SHORT = `api/v1/filter-graph?sort=`;
export const CHAT_NOTIFICATION_COUNT = `api/v1/chat-and-notification-count`;
export const NOTIFICATION_LIST = `api/v1/notification-list`;
export const NOTIFICATION_DETAIL = `api/v1/notification-list/`;
export const SUPPLEMENT_LIST = `api/v1/supplements/list`;
export const EXERCISE_LIST = `api/v1/exercises/list`;
export const STORE_DAILY_TRACKING = `api/v1/daily-traking/store`;
export const UPDATE_DAILY_TRACKING = `api/v1/daily-traking/update/`;
export const DELETE_DAILY_TRACKING = `api/v1/daily-traking/delete/`;
export const TERM_AND_CONDITION = `api-page/terms-conditions`;
export const ADDED_MEAL_LIST = `api/v1/added/meal/list?date=`;
export const SEND_MSG = `api/v1/send-msg`;
export const READ_MSG = `api/v1/send-msg/read`;
export const CUSTOMER_LIST = `api/v1/customer-list/chat`;
export const DASHBOARD = `api/v1/dashboard`;
export const INSTRUCTIONAL = `api/v1/instructional`;
export const INSTRUCTIONAL_GUIDES = `api/v1/instructional/guides`;
export const INSTRUCTIONAL_TEMPLATES = `api/v1/instructional/templates`;
export const INSTRUCTIONAL_VIDEOS = `api/v1/instructional/videos`;
export const ELITE_MEMBERSHIP_REQUEST = `api/v1/elite-membership-request`;
export const RECIPE_LIST = `api/v1/recipe/list`;
export const CATEGORIES = `api/v1/categories`;
export const SEARCH_RECIPE = `api/v1/recipe/list?search=`;
export const CATEGORY_RECIPE = `api/v1/recipe/list?category=`;
export const SEARCH_MEAL = `api/v1/search-meal?meal=`;
export const ADD_TO_FAVOURITE = `api/v1/recipe/add/favourite/`;
export const FAVOURITE_LIST = `api/v1/recipe/list/favourite`;
export const RECIPE_DETAIL = `api/v1/recipe/detail/`;
export const SUBSCRIBE_PLAN = `api/v1/subscribe-plan/`;
export const DAILY_TRACKING_BY_DATE = `api/v1/daily-traking-by-date?date=`;
export const TRACKING_7_DAYS = `api/v1/tracking-7-days`;
export const SUBSCRIPTION_PLANS = `api/v1/subscription-plans`;
export const SQUARE_PAYMENT_URL = `api/v1/square-payment-url/`;
export const CANCEL_SUBSCRIPTION = `api/v1/cancel-subscription`;
export const APPLE_PLAN = `api/v1/apple-plan/`;
export const UPDATE_PROFILE_IMAGE = `api/v1/profile-image/update`;
export const ADD_MEAL = `api/v1/add/meal`;
export const RESET_PASSWORD = `api/v1/customer/reset-password`;
export const CHANGE_PASSWORD = `api/v1/customer/reset-password/update`;
export const UPDATE_PASSWORD = `api/v1/change-password`;
export const RESET_FASTING_TIME = `api/v1/reset/time`;
export const GET_USER_DETAIL = `api/v1/get-current-user-detail`;
export const CHANGE_APPLE_SUBSCRIPTION = `api/v1/cancel-apple-subscription`;
export const SECOND_REGISTER = `api/v1/customer/second/step`;
export const THIRD_REGISTER = `api/v1/customer/third/step`;
export const FORTH_REGISTER = `api/v1/customer/four/step`;
export const FIFTH_REGISTER = `api/v1/customer/five/step`;
export const SIXTH_REGISTER = `api/v1/customer/six/step`;
export const SEVENTH_REGISTER = `api/v1/customer/seven/step`;
export const EIGHTH_REGISTER = `api/v1/customer/eight/step`;
export const NINTH_REGISTER = `api/v1/customer/nine/step`;
export const TENTH_REGISTER = `api/v1/customer/ten/step`;
export const ELEVENTH_REGISTER = `api/v1/customer/eleven/step`;
export const GET_FORMS_DATA = `api/v1/step/forms/`;
//function : imp function
const objToQueryString = obj => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
};
//function : get api
export const getApi = endPoint =>
  axios
    .get(`${BASE_URL}${endPoint}`)
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });

//function : post api
export const postApi = (endPoint, data) =>
  axios
    .post(`${BASE_URL}${endPoint}`, data)
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
//function : get api with token
export const getApiWithToken = (token, endPoint) =>
  axios
    .get(`${BASE_URL}${endPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
export const getAPI = async (endPoint, token = '', paramsData = {}) => {
  const url = BASE_URL + endPoint + objToQueryString(paramsData);
  console.log('URL', url);
  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      return {
        response: res.data,
        status: true,
      };
    })
    .catch(error => {
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return {
        response: error,
        status: false,
      };
    });
};
//function : post Api
export const postAPI = async (endPoint, data, token = '') => {
  const url = BASE_URL + endPoint;
  console.log('POST URL:-', url);
  console.log('POST DATA:-', JSON.stringify(data));
  return await axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    })
    .then(res => {
      return {
        response: res?.data,
        status: res?.data?.status,
      };
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return {
        response: error,
        status: false,
      };
    });
};
export const postPayAPI = async (endPoint, data, token = '') => {
  const url = BASE_URL + endPoint;
  console.log('POST URL:-', url);
  console.log('POST DATA:-', JSON.stringify(data));
  return await axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    })
    .then(res => {
      return {
        response: res.data,
        status: true,
      };
    })
    .catch(error => {
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return {
        response: error,
        status: false,
      };
    });
};
export const getApiWithTokenLogout = async (token, endPoint) => {
  const url = BASE_URL + endPoint;
  console.log('URL:-', url);
  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
};
//function : post api with token
export const postApiWithToken = (token, endPoint, data) =>
  axios
    .post(`${BASE_URL}${endPoint}`, data, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
//function : put api with token
export const putApiWithToken = (token, endPoint, data) =>
  axios
    .put(`${BASE_URL}${endPoint}`, data, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
