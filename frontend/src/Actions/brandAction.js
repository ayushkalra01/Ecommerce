import axios from "axios";
import { toast } from "react-toastify";
import {
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_CREATE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DETAILS_REQUEST,
  BRAND_DETAILS_SUCCESS,
  BRAND_DETAILS_FAIL,
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_SUCCESS,
  BRAND_UPDATE_FAIL,
} from "../Constants/brandConstant.js";

export const createBrand = (name, category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BRAND_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.post("/api/brand", { name, category }, config);
    dispatch({
      type: BRAND_CREATE_SUCCESS,
      payload: data,
    });
    toast.success(`Brand ${name} created successfully`);
  } catch (error) {
    dispatch({
      type: BRAND_CREATE_FAIL,
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

export const listBrands = () => async (dispatch) => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST });

    const { data } = await axios.get("/api/brand/all");

    dispatch({
      type: BRAND_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRAND_LIST_FAIL,
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

export const deleteBrand = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BRAND_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    await axios.delete(`/api/brand/${slug}`, config);
    dispatch({
      type: BRAND_DELETE_SUCCESS,
    });
    toast.success(`Brand ${slug} deleted successfully`);
  } catch (error) {
    dispatch({
      type: BRAND_DELETE_FAIL,
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

export const listBrandDetails = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: BRAND_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/brand/${slug}`);

    dispatch({
      type: BRAND_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRAND_DETAILS_FAIL,
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

export const updateBrand =
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
        type: BRAND_UPDATE_REQUEST,
      });

      const { data } = await axios.put(
        `/api/brand/${slug}`,
        { name, category },
        config
      );
      dispatch({
        type: BRAND_UPDATE_SUCCESS,
        payload: data,
      });
      toast.success(`Brand ${name} updated successfully`);
    } catch (error) {
      dispatch({
        type: BRAND_UPDATE_FAIL,
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
