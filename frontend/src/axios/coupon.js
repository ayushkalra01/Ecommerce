import axios from "axios";

export const getAllCoupons = async () => await axios.get("/api/coupon/all");

export const createCoupon = async (coupon, token) =>
  await axios.post(
    "/api/coupon",
    { coupon },
    {
      headers: {
        Authorization: token,
      },
    }
  );

export const deleteCoupon = async (id, token) =>
  await axios.delete(`/api/coupon/${id}`, {
    headers: {
      Authorization: token,
    },
  });
