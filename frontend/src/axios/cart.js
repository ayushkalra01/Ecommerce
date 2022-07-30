import axios from "axios";

export const saveUserCartItems = async (cart, token) =>
  await axios.post(
    "/api/cart",
    { cart },
    {
      headers: {
        Authorization: token,
      },
    }
  );

export const getUserCartItems = async (token) =>
  await axios.get("/api/cart", {
    headers: {
      Authorization: token,
    },
  });

export const deleteUserCartItems = async (token) =>
  await axios.delete("/api/cart", {
    headers: {
      Authorization: token,
    },
  });

export const saveUserShippingAddress = async (address, token) =>
  await axios.post(
    "/api/cart/address",
    { address },
    {
      headers: {
        Authorization: token,
      },
    }
  );

export const applyCoupon = async (coupon, token) =>
  await axios.post(
    "/api/cart/coupon",
    { coupon },
    {
      headers: {
        Authorization: token,
      },
    }
  );
