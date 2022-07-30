import React, { useState } from "react";

const ShowPaymentInfo = ({ order }) => {
  const [show, setShow] = useState(false);

  const description = () => (
    <>
      <p className="mt-2">
        <b>Order Id: {order.paymentIntent.id}</b>
      </p>{" "}
      <p>
        Amount:{" "}
        {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "INR",
        })}
      </p>{" "}
      <p>Currency: {order.paymentIntent.currency.toUpperCase()}</p>{" "}
      <p>Method: {order.paymentIntent.payment_method_types[0]}</p>{" "}
      <p>Payment: {order.paymentIntent.status.toUpperCase()}</p>{" "}
      <p>
        Ordered on:{" "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </p>{" "}
    </>
  );

  const message = () => (
    <>
      <span
        className="badge bg-primary text-white"
        style={{ fontSize: "15px", cursor: "pointer" }}
      >
        STATUS: {order.orderStatus}{" "}
      </span>
      <span
        className="float-right"
        style={{ fontSize: "17px", cursor: "pointer" }}
      >
        <i className="fas fa-info-circle" onClick={() => setShow(!show)}></i>
      </span>
      {show && description()}
    </>
  );

  return <div className="mb-3">{message()}</div>;
};

export default ShowPaymentInfo;
