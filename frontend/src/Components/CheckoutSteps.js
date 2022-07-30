import React from "react";
import { Steps } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Step } = Steps;
const CheckoutSteps = ({ step0, step1, step2, step3, step4 }) => {
  return (
    <div className="mt-5">
      {step0 && (
        <Steps current={0}>
          <Step title="Cart" />
          <Step title="Checkout" />
          <Step title="Shipping" />
          <Step title="Payment" />
        </Steps>
      )}
      {step1 && (
        <Steps current={1}>
          <Step title="Cart" />
          <Step title="Checkout" />
          <Step title="Shipping" />
          <Step title="Payment" />
        </Steps>
      )}
      {step2 && (
        <Steps current={2}>
          <Step title="Cart" />
          <Step title="Checkout" />
          <Step title="Shipping" />
          <Step title="Payment" />
        </Steps>
      )}
      {step3 && (
        <Steps current={3}>
          <Step title="Cart" />
          <Step title="Checkout" />
          <Step title="Shipping" />
          <Step title="Payment" />
        </Steps>
      )}
      {step4 && (
        <Steps current={4}>
          <Step title="Cart" />
          <Step title="Checkout" />
          <Step title="Shipping" />
          <Step title="Payment" icon={<SmileOutlined />} />
        </Steps>
      )}
    </div>
  );
};

export default CheckoutSteps;
