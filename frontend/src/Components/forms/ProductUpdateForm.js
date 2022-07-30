import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  categories,
  subCategories,
  brands,
  setValues,
  handleCategoryChange,
  subIds,
  setSubIds,
  handleBrandChange,
}) => {
  const {
    title,
    description,
    price,
    quantity,
    colors,
    shipping,
    color,
    category,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-info">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-info">Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-info">Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-info">Shipping</label>
        <select
          value={shipping === "No" ? "No" : "Yes"}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option value="No">Not Available</option>
          <option value="Yes">Available</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-info">Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-info">Color</label>
        <select
          name="color"
          className="form-control"
          value={color}
          onChange={handleChange}
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-info">Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-info">SubCategory</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          value={subIds}
          placeholder="Please Select Sub Category"
          onChange={(value) => setSubIds(value)}
        >
          {subCategories.length > 0 &&
            subCategories
              .filter((s) => s.category === category._id)
              .map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
        </Select>
      </div>

      <div className="form-group">
        <label className="text-info">Brand</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleBrandChange}
          value={brand._id}
        >
          {brands.length > 0 &&
            brands
              .filter((b) => b.category === category._id)
              .map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
        </select>
      </div>

      <button type="submit" className="btn btn-raised btn-info my-3">
        {/* {loading ? <span>Updating...</span> : <span>Update Product</span>} */}
        <span>Update Product</span>
      </button>
    </form>
  );
};

export default ProductUpdateForm;
