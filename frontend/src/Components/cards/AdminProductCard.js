import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Rating from "../Rating";
const { Meta } = Card;

const ProductCard = ({ product, handleDelete }) => {
  const { title, description, images, price, rating, numReviews } = product;
  return (
    <div className="products">
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : ""}
            alt="product"
            style={{ height: "180px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/admin/product/${product.slug}`}>
            <EditOutlined className="text-info" />
            <br /> Edit
          </Link>,
          <span>
            <DeleteOutlined
              className="text-danger"
              onClick={() => handleDelete(product.slug)}
            />
            <br /> Delete
          </span>,
        ]}
        style={{ marginTop: 16 }}
        className="product-card"
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 20)}...`}
        />
        <Rating value={rating} text={`${numReviews} reviews`} />
        <h4 className="mt-3">Rs. {price}</h4>
      </Card>
    </div>
  );
};

export default ProductCard;
