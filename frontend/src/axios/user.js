import axios from "axios";

export const addToWishlist = async (productId, token) =>
  await axios.post(
    "/api/users/wishlist",
    { productId },
    {
      headers: {
        Authorization: token,
      },
    }
  );

export const getWishlist = async (token) =>
  await axios.get("/api/users/wishlist", {
    headers: {
      Authorization: token,
    },
  });

export const removeFromWishlist = async (id, token) =>
  await axios.put(
    `/api/users/wishlist/${id}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
