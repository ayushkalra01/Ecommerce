import axios from "axios";
import { toast } from "react-toastify";
import {
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS,
  SUBCATEGORY_LIST_FAIL,
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_SUCCESS,
  SUBCATEGORY_CREATE_FAIL,
  SUBCATEGORY_DELETE_REQUEST,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DELETE_FAIL,
  SUBCATEGORY_DETAILS_REQUEST,
  SUBCATEGORY_DETAILS_SUCCESS,
  SUBCATEGORY_DETAILS_FAIL,
  SUBCATEGORY_UPDATE_REQUEST,
  SUBCATEGORY_UPDATE_SUCCESS,
  SUBCATEGORY_UPDATE_FAIL,
} from "../Constants/subCategoryConstant";

export const createSubCategory =
  (name, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBCATEGORY_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: userInfo.token,
        },
      };
      const { data } = await axios.post(
        "/api/subcategory",
        { name, category },
        config
      );
      dispatch({
        type: SUBCATEGORY_CREATE_SUCCESS,
        payload: data,
      });
      toast.success(`SubCategory ${name} created successfully`);
    } catch (error) {
      dispatch({
        type: SUBCATEGORY_CREATE_FAIL,
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

export const listSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_LIST_REQUEST });

    const { data } = await axios.get("/api/subcategory/all");

    dispatch({
      type: SUBCATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_LIST_FAIL,
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

export const deleteSubCategory = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBCATEGORY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    await axios.delete(`/api/subcategory/${slug}`, config);
    dispatch({
      type: SUBCATEGORY_DELETE_SUCCESS,
    });
    toast.success(`SubCategory ${slug} deleted successfully`);
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DELETE_FAIL,
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

export const listSubCategoryDetails = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: SUBCATEGORY_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/subcategory/${slug}`);

    dispatch({
      type: SUBCATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DETAILS_FAIL,
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

export const updateSubCategory =
  (name, slug, category) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: userInfo.token,
        },
      };
      dispatch({
        type: SUBCATEGORY_UPDATE_REQUEST,
      });

      const { data } = await axios.put(
        `/api/subcategory/${slug}`,
        { name, category },
        config
      );
      dispatch({
        type: SUBCATEGORY_UPDATE_SUCCESS,
        payload: data,
      });
      toast.success(`SubCategory ${name} updated successfully`);
    } catch (error) {
      dispatch({
        type: SUBCATEGORY_UPDATE_FAIL,
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
