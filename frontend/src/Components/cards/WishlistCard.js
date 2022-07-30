import React, { useState } from "react";
import { Card, Tooltip, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import Rating from "../Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Actions/cartAction";
import { CART_DRAWER } from "../../Constants/cartConstant";
const { Meta } = Card;

const WishlistCard = ({ product, handleRemove }) => {
  const { title, description, images, slug, numReviews, rating, price } =
    product;

  const dispatch = useDispatch();
  const handleCart = () => {
    setTooltip("Added");
    dispatch(addToCart({ ...product, count: 1 }));
    dispatch({ type: CART_DRAWER, payload: true });
  };
  const [tooltip, setTooltip] = useState("Add to Cart");
  return (
    <div className="products">
      <Link to={`/product/${slug}`}>
        <Card
          cover={
            <img
              src={images && images.length ? images[0].url : ""}
              alt="product"
              style={{ height: "150px", objectFit: "cover" }}
            />
          }
          actions={[
            product.quantity < 1 ? (
              <span>
                <ShoppingCartOutlined
                  style={{ fontSize: "16px" }}
                  className="text-danger"
                />
                <br />
                Out of Stock
              </span>
            ) : (
              <Tooltip title={tooltip}>
                <span onClick={handleCart}>
                  <ShoppingCartOutlined
                    style={{ color: "hsl(211, 39%, 23%)", fontSize: "16px" }}
                  />
                  <br />
                  Add to Cart
                </span>
              </Tooltip>
            ),
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => handleRemove(product._id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="text-danger" />
              <br /> Remove
            </Popconfirm>,
          ]}
          style={{ marginTop: 16 }}
          className="product-card mb-3"
        >
          <Meta
            title={title}
            description={`${description && description.substring(0, 20)}...`}
          />

          <Rating value={rating} text={`${numReviews} reviews`} />
          <h4 className="mt-3">Rs. {price}</h4>
        </Card>
      </Link>
    </div>
  );
};

export default WishlistCard;
