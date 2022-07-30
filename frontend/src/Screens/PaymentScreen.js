import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../Components/StripeCheckout";
import "../stripe.css";
import CheckoutSteps from "../Components/CheckoutSteps";
import Meta from "../Components/Meta";

// load Stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(
  "pk_test_51K4dy2SG264J1ES8rIhW53y26vitlOK0wbOH11l0z7WbLNtDF3WblGYNgEoavyme9MDnuavxZxKwAEHT45F3m1jH00ra1JjIcV"
);

const PaymentScreen = ({ history }) => {
  const intended = history.location.coupon;
  return (
    <div className="container p-5 text-center">
      <Meta title="Electroo: Payment" />
      <div className="row">
        <div className="col-md-8 offset-md-2 mb-5 mt-2">
          <CheckoutSteps step3 />
        </div>
      </div>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout intended={intended} />
        </div>
      </Elements>
    </div>
  );
};

export default PaymentScreen;
