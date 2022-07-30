import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
import { CART_DRAWER } from "../Constants/cartConstant";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartDrawer = useSelector((state) => state.cartDrawer);

  const handleClose = () => {
    dispatch({ type: CART_DRAWER, payload: false });
  };

  const imageStyle = {
    width: "100%",
    height: "100px",
    objectFit: "cover",
  };

  return (
    <Drawer
      onClose={handleClose}
      visible={cartDrawer}
      className="text-center"
      placement="right"
      closable={false}
      title={`Cart / ${cartItems.length} Products`}
    >
      {cartItems.map((c) => (
        <div key={c._id} className="row">
          <div className="col">
            {c.images[0] && (
              <>
                <img src={c.images[0].url} alt="CartImage" style={imageStyle} />
                <p className="text-center text-light bg-secondary">
                  {c.title} x {c.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          onClick={() => dispatch({ type: CART_DRAWER, payload: false })}
          className="text-center btn btn-info btn-raised btn-block"
        >
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default CartDrawer;
