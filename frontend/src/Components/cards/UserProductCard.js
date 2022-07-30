import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Rating from "../Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Actions/cartAction";
import { CART_DRAWER } from "../../Constants/cartConstant";
const { Meta } = Card;

const UserProductCard = ({ product }) => {
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
          hoverable={true}
          cover={
            <img
              src={images && images.length ? images[0].url : ""}
              alt="product"
              style={{ height: "180px", objectFit: "cover" }}
            />
          }
          actions={[
            product.quantity < 1 ? (
              <span>
                <ShoppingCartOutlined
                  style={{ fontSize: "18px" }}
                  className="text-danger"
                />
                <br />
                Out of Stock
              </span>
            ) : (
              <Tooltip title={tooltip}>
                <span onClick={handleCart}>
                  <ShoppingCartOutlined
                    style={{ color: "hsl(211, 39%, 23%)", fontSize: "18px" }}
                  />
                  <br />
                  Add to Cart
                </span>
              </Tooltip>
            ),
          ]}
          style={{ marginTop: 16 }}
          className="product-card mb-3"
        >
          <Meta
            title={title}
            description={`${description && description.substring(0, 30)}...`}
          />

          <Rating value={rating} text={`${numReviews} reviews`} />
          <h4 className="mt-3">Rs. {price}</h4>
        </Card>
      </Link>
    </div>
  );
};

export default UserProductCard;
