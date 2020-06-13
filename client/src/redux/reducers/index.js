import { combineReducers } from "redux";
import alert from "./alert";
import rest_auth from "./restaurant/auth";

export default combineReducers({
  alert,
  rest_auth
});
