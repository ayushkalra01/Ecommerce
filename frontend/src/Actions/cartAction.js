import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../Constants/cartConstant";

export const addToCart = (p) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: p,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (c) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: c });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
