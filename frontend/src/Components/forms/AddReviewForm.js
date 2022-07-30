import React from "react";

import { Input, Select } from "antd";

const { TextArea } = Input;

const { Option } = Select;

const AddReviewForm = ({ setRateValue, setComment }) => {
  return (
    <form>
      <div className="form-group">
        <label className="text-secondary">Rating</label>
        <Select
          className="form-control"
          placeholder="Select Rating"
          onChange={(value) => setRateValue(value)}
        >
          <Option value="1">1 - Poor</Option>
          <Option value="2">2 - Fair</Option>
          <Option value="3">3 - Average</Option>
          <Option value="4">4 - Good</Option>
          <Option value="5">5 - Excellent</Option>
        </Select>
      </div>
      <div className="form-group">
        <label className="text-secondary">Comment</label>
        <TextArea
          rows={2}
          showCount
          maxLength={100}
          allowClear
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </form>
  );
};

export default AddReviewForm;
