import React from "react";
import { Link } from "react-router-dom";

const ProductCardItems = ({ product }) => {
  const {
    price,
    category,
    subCategory,
    shipping,
    brand,
    quantity,
    color,
    sold,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price
        <span className="label label-default label-pill pull-xs-right">
          Rs. {price}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category
          <Link
            to={`/product/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subCategory && (
        <li className="list-group-item">
          Sub Categories
          {subCategory.map((s) => (
            <Link
              to={`/product/subcategory/${s.slug}`}
              key={s._id}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Shipping
        <span className="label label-default label-pill pull-xs-right">
          {shipping === "Yes" ? "Available" : "Not Available"}
        </span>
      </li>

      <li className="list-group-item">
        Color
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      {brand && (
        <li className="list-group-item">
          Brand
          <Link
            to={`/product/brand/${brand.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {brand.name}
          </Link>
        </li>
      )}

      <li className="list-group-item">
        Status
        {quantity > 0 ? (
          <span className="label label-default label-pill pull-xs-right">
            In Stock
          </span>
        ) : (
          <span className="text-danger label label-default label-pill pull-xs-right">
            Out of Stock
          </span>
        )}
      </li>

      <li className="list-group-item">
        Sold
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductCardItems;
