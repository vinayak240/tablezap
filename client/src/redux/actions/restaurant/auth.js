import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "../types";
import setAuthToken from "../../../utils/setAuthToken";
import { setAlert } from "../alert";

export const loadRest = token => async dispatch => {
  if (localStorage.rest_token) {
    setAuthToken(localStorage.rest_token);
  }

  try {
    const res = await axios.get("http://localhost:5000/restaurants/rest/");
    // console.log(res);

    if (Boolean(res.data) && res.data.success) {
      // See the returned JSON properly
      dispatch({
        type: USER_LOADED,
        payload: {
          ...res.data.restaurant
        }
      });
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const login = (rest_id, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ rest_id, rest_psswd: password });

  try {
    const res = await axios.post(
      "http://localhost:5000/restaurants/login/",
      body,
      config
    );
    //   console.log(res);

    if (Boolean(res.data) && res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token
        }
      });
      dispatch(loadRest());
    }
  } catch (error) {
    // console.log(error.message);

    const msg = error.response
      ? error.response.data.msg
      : "Something went wrong...";

    if (msg.toLowerCase() === "validation errors") {
      const errors = error.response.data.errors;
      if (errors)
        errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    } else {
      dispatch(setAlert(msg, "error"));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Register User
export const register = data => async dispatch => {
  // const { rest_name, rest_email, rest_psswd } = data;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(data);

  try {
    const res = await axios.post(
      "http://localhost:5000/restaurants/register/",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        token: res.data.token
      }
    });

    dispatch(loadRest());
  } catch (err) {
    const msg = error.response
      ? error.response.data.msg
      : "Something went wrong...";

    if (msg.toLowerCase() === "validation errors") {
      const errors = error.response.data.errors;
      if (errors)
        errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    } else {
      dispatch(setAlert(msg, "error"));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};
