import axios from "axios";
import { REST_API_BASE_URL } from "../constants/api-constants";

export default () => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (localStorage.rest_token) {
    headers["x-auth-token"] = localStorage.rest_token;
  }
  const instance = axios.create({
    baseURL: REST_API_BASE_URL,
    headers,
    withCredentials: true,
  });

  // Add response interceptor when routes are done!

  return instance;
};
