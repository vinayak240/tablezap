// import axios from "axios";
import apiClient from "../../../api-clients/axios_rest";
import { UPDATED_REST, UPDATING_REST, UPDATE_ERR } from "../types";
import { setAlert } from "../alert";
import { clone } from "ramda";
import updateRestImages from "../../../firebase/update_lib";

export const updateRestaurant = (restaurant, categ) => async (dispatch) => {
  // const body = clone(restaurant);
  try {
    dispatch({
      type: UPDATING_REST,
    });
    let final_obj = await updateRestImages(restaurant);
    const body = JSON.stringify(final_obj);
    const res = await apiClient().put(`/rest/${categ}/`, body);

    if (res.data.success) {
      // See the returned JSON properly
      dispatch({
        type: UPDATED_REST,
        payload: {
          ...res.data.restaurant,
        },
      });
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
      type: UPDATE_ERR,
    });
  }
};
