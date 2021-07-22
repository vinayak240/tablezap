import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REST_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  UPDATED_REST,
  UPDATE_ERR,
  UPDATING_REST,
  SET_LOADING,
  REFRESHED_TOKEN,
} from "../../actions/types";
import { clone } from "ramda";

const initialState = {
  token: localStorage.getItem("rest_token"),
  isAuthenticated: null,
  isUpdated: false,
  loading: true,
  restaurant: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REST_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        restaurant: clone(payload),
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case REFRESHED_TOKEN:
      localStorage.setItem("rest_token", payload.token);
      return {
        ...state,
      };
    case UPDATING_REST:
      return {
        ...state,
        isUpdated: false,
      };
    case UPDATED_REST:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        restaurant: clone(payload),
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("rest_token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        restaurant: null,
      };
    case UPDATE_ERR:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };
    default:
      return state;
  }
}
