import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/users/user/");

    if (Boolean(res.data) && res.data.success) {
      dispatch({
        type: USER_LOADED,
        payload: { ...res.data.user }
      });
    } else {
      dispatch({
        type: AUTH_ERROR
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({
  name,
  email,
  phone,
  password
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, phone, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/users/register/",
      body,
      config
    );

    if (res.data.success) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: res.data.token
        }
      });
      dispatch(loadUser());
    }
  } catch (error) {
    const msg = error.response.data.msg;

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

// Login User - login action creator!
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/users/login/",
      body,
      config
    );

    if (res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token
        }
      });
      dispatch(loadUser());
    }
  } catch (error) {
    const msg = error.response.data.msg;

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

// Google Login - User - Action creator!
export const googleLogin = token => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ token });

  try {
    const res = await axios.post(
      "http://localhost:5000/users/google-login/",
      body,
      config
    );

    if (res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token
        }
      });
      dispatch(loadUser());
    }
  } catch (error) {
    const msg = error.response.data.msg;
    dispatch(setAlert(msg, "error"));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
