import {
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_REQUEST,
} from "../Constants/searchConstant";
import axios from "axios";
import { toast } from "react-toastify";

export const listSearchProducts = (arg) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PRODUCT_REQUEST });
    const { data } = await axios.post(`/api/product/search/filters`, arg);
    dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};
