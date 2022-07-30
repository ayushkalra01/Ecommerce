import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";
import CheckoutSteps from "./CheckoutSteps";
import Meta from "./Meta";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(10);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current_count) => --current_count);
    }, 1000);

    // redirect once count is equal to 0
    count === 0 && history.push("/user/history");

    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center ">
      <Meta title="Thanks for shopping with us." />
      <div className="row">
        <div className="col-md-8 offset-md-2 mb-4 mt-3">
          <CheckoutSteps step4 />
        </div>
      </div>
      <Result
        status="success"
        title="Successfully Purchased !"
        className="mb-5 mt-5"
        subTitle={`It takes 2-3 minutes, please wait.`}
        extra={
          <Button
            className="mb-3"
            icon={<i className="fas fa-shopping-bag p-1"></i>}
            size="large"
            onClick={() => history.push("/shop")}
            style={{ backgroundColor: "rgb(64, 169, 255)", color: "white" }}
          >
            Buy Again
          </Button>
        }
      />
    </div>
  );
};

export default LoadingToRedirect;
