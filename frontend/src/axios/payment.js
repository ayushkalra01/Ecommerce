import axios from "axios";

export const createPaymentIntent = async (couponApplied, token) =>
  await axios.post(
    "/create-payment-intent",
    { couponApplied },
    {
      headers: {
        Authorization: token,
      },
    }
  );
