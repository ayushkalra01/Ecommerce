import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  categories,
  subCategories,
  brands,
  setValues,
  handleCategoryChange,
  show,
  loading,
}) => {
  const {
    title,
    description,
    price,
    quantity,
    colors,
    category,
    subCategory,
    shipping,
    color,
    brand,
    images,
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
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please Select</option>
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
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Please Select Color</option>
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
        >
          <option>Please Select Category</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {show && (
        <div className="form-group">
          <label className="text-info">SubCategory</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please Select Sub Category"
            value={subCategory}
            onChange={(value) => setValues({ ...values, subCategory: value })}
          >
            {subCategories.length > 0 &&
              subCategories
                .filter((s) => s.category === category)
                .map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
          </Select>
        </div>
      )}

      {show && (
        <div className="form-group">
          <label className="text-info">Brand</label>
          <select name="brand" className="form-control" onChange={handleChange}>
            <option>Please Select Brand</option>
            {brands.length > 0 &&
              brands
                .filter((b) => b.category === category)
                .map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-raised btn-info my-3"
        disabled={
          loading ||
          !title ||
          !description ||
          !price ||
          !quantity ||
          !shipping ||
          !color ||
          !category ||
          !brand ||
          !subCategory ||
          images.length === 0
        }
      >
        {loading ? <span>Saving...</span> : <span>Save Product</span>}
      </button>
    </form>
  );
};

export default ProductCreateForm;
