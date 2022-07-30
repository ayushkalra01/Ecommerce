import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCartItems,
  //deleteUserCartItems,
  saveUserShippingAddress,
  applyCoupon,
} from "../axios/cart";
import { toast } from "react-toastify";
//import { CART_EMPTY } from "../Constants/cartConstant";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert } from "antd";
import { COUPON_APPLIED_SUCCESS } from "../Constants/cartConstant";
//import CheckoutSteps from "../Components/CheckoutSteps";
import { Button } from "antd";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Meta } from "antd/lib/list/Item";

const CheckoutScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [isAddressSave, setIsAddressSave] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

  useEffect(() => {
    getUserCartItems(userInfo.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((e) => {
        toast.error(e.message);
        console.log(e);
      });
    // eslint-disable-next-line
  }, []);

  const saveAddresstoDb = () => {
    saveUserShippingAddress(address, userInfo.token).then((res) => {
      if (res.data.success) {
        setIsAddressSave(true);
        userInfo.address = address;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        toast.success("Address Saved");
      }
    });
  };

  // const emptyCart = () => {
  //   if (window.confirm("Empty the Cart?")) {
  //     deleteUserCartItems(userInfo.token)
  //       .then((res) => {
  //         if (res.data.success === true) {
  //           dispatch({ type: CART_EMPTY });
  //           localStorage.removeItem("cartItems");
  //           history.push("/");
  //         }
  //       })
  //       .catch((e) => {
  //         toast.error(e.message);
  //         console.log(e);
  //       });
  //   }
  // };

  const applyDiscountCoupon = () => {
    applyCoupon(coupon, userInfo.token)
      .then((res) => {
        if (res.data.err) {
          setSuccess(false);
          setError(res.data.err);
          dispatch({ type: COUPON_APPLIED_SUCCESS, payload: false });
        } else {
          setTotalAfterDiscount(res.data);
          setSuccess(true);
          setError("");
          dispatch({ type: COUPON_APPLIED_SUCCESS, payload: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <Meta title="Electroo: Shipping" />
      <div className="row">
        <div className="col mb-4 mt-3">
          <CheckoutSteps step2 />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h3 style={{ color: "#001529" }}>Shipping Address</h3>
          <br />
          <ReactQuill theme="snow" value={address} onChange={setAddress} />

          <Button
            className="mt-3"
            icon={<i className="fas fa-map-marker-alt p-1"></i>}
            size="large"
            style={{ backgroundColor: "#001529", color: "white" }}
            onClick={saveAddresstoDb}
          >
            Save Address
          </Button>
          <hr />
          <br />
          <h3 style={{ color: "#001529", fontSize: "25px" }}>Got Coupon?</h3>
          <input
            type="text"
            className="form-control"
            value={coupon}
            placeholder="Enter Coupon Code"
            onChange={(e) => setCoupon(e.target.value)}
          />
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              className="mt-2"
              closable
            />
          )}
          {success && (
            <Alert
              message={`Coupon applied successfully`}
              type="success"
              showIcon
              className="mt-2"
              closable
            />
          )}

          <Button
            className="mt-3"
            size="large"
            style={{ backgroundColor: "#001529", color: "white" }}
            onClick={applyDiscountCoupon}
          >
            Apply Coupon
          </Button>
        </div>
        <div className="col-md-6">
          <h3 style={{ color: "#001529" }}>Order Summary</h3>
          <hr />
          <p style={{ fontSize: "20px" }}>Products ({products.length})</p>

          {products.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.title} ({p.color}) x {p.count} ={" "}
                {p.product.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          {success && totalAfterDiscount > 0 ? (
            <Alert
              message={
                <span style={{ letterSpacing: "0.08rem" }}>
                  Cart Total: Rs.
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "hsl(210, 22%, 49%)",
                    }}
                  >
                    {total}
                  </span>
                  <b> {totalAfterDiscount} </b>
                </span>
              }
              type="warning"
              className="mt-2 mb-4"
            />
          ) : (
            <p>Cart Total: Rs.{total}</p>
          )}

          <div className="row">
            <div className="col-md-6">
              <Button
                size="large"
                style={{ backgroundColor: "#001529", color: "white" }}
                disabled={!isAddressSave || !products.length}
                onClick={() =>
                  history.push({
                    pathname: "/payment",
                    coupon: coupon,
                  })
                }
              >
                Place Order
              </Button>
            </div>
            {/* <div className="col-md-6">
              <button
                disabled={!products.length}
                onClick={emptyCart}
                className="btn btn-raised btn-info"
              >
                Empty Cart
              </button>

             
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
