// import axios from "axios";
import apiClient from "../../../api-clients/axios_rest";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REST_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REFRESHED_TOKEN,
} from "../types";
import { setAlert } from "../alert";
import uploadRestImages from "../../../firebase/upload_lib";

export const loadRest = (token) => async (dispatch) => {
  try {
    const res = await apiClient().get("/rest/");
    // console.log(res);

    if (Boolean(res.data) && res.data.success) {
      // See the returned JSON properly
      dispatch({
        type: REST_LOADED,
        payload: {
          ...res.data.restaurant,
        },
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (rest_id, password) => async (dispatch) => {
  const body = JSON.stringify({ rest_id, rest_psswd: password });

  try {
    const res = await apiClient().post("/login/", body);
    //   console.log(res);

    if (Boolean(res.data) && res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
        },
      });
      dispatch(loadRest());

      setTimeout(() => {
        dispatch(refreshToken(5 * 60 * 1000));
      }, 5 * 60 * 1000 - 500);
    } else {
      throw new Error("Something went wrong...");
    }
  } catch (error) {
    // console.log(error.message);

    const msg = error.response
      ? error.response.data.msg
      : "Something went wrong...";

    if (msg.toLowerCase() === "validation errors") {
      const errors = error.response.data.errors;
      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    } else {
      dispatch(setAlert(msg, "error"));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Register a Restaurant
export const register = (data) => async (dispatch) => {
  // const { rest_name, rest_email, rest_psswd } = data;
  try {
    let final_obj = await uploadRestImages(data);
    const body = JSON.stringify(final_obj);

    const res = await apiClient().post("/register/", body);
    if (Boolean(res.data) && res.data.success) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: res.data.token,
        },
      });

      dispatch(loadRest());

      setTimeout(() => {
        dispatch(refreshToken(5 * 60 * 1000));
      }, 5 * 60 * 1000 - 500);
    } else {
      throw new Error("Something went wrong...");
    }
  } catch (error) {
    const msg = error.response
      ? error.response.data.msg
      : "Something went wrong...";

    if (msg.toLowerCase() === "validation errors") {
      const errors = error.response.data.errors;
      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    } else {
      dispatch(setAlert(msg, "error"));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const refreshToken = (timeout) => async (dispatch) => {
  try {
    const res = await apiClient().get("/refresh-token/");
    // console.log(res);

    if (Boolean(res.data) && res.data.success) {
      setTimeout(() => {
        dispatch(refreshToken(5 * 60 * 1000)); // use this convention bcoz refreshToken() just return action creator to reduce it we use dispatch
      }, timeout - 500); // After every 5mins do a silent refresh of token

      // See the returned JSON properly
      dispatch({
        type: REFRESHED_TOKEN,
        payload: {
          token: res.data.token,
        },
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
