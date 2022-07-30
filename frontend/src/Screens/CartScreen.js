import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartCards from "../Components/cards/CartCards";
import { saveUserCartItems } from "../axios/cart";
import { Button } from "antd";
import { toast } from "react-toastify";
import CheckoutSteps from "../Components/CheckoutSteps";
import Meta from "../Components/Meta";

const CartScreen = ({ history }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getTotal = () => {
    return cartItems.reduce((acc, curr) => {
      return acc + curr.count * curr.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    saveUserCartItems(cartItems, userInfo.token)
      .then((res) => {
        if (res.data.success === true) history.push("/checkout");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const showCartItems = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Brand</th>
              <th scope="col">Color</th>
              <th scope="col">Quantity</th>
              <th scope="col">Shipping</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          {cartItems.map((c) => {
            return <CartCards key={c._id} c={c} />;
          })}
        </table>
      </div>
    );
  };

  return (
    <div className="container-fluid pt-2">
      <Meta title="Electroo: Cart" />
      <div className="row">
        <div className="col mb-4 mt-2">
          {cartItems.length === 0 ? (
            <CheckoutSteps step0 />
          ) : (
            <CheckoutSteps step1 />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 style={{ color: "#001529" }}>
            {" "}
            <i className="fas fa-shopping-bag p-1"></i>Cart
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {!cartItems.length ? (
            <p className="text-center mb-5 mt-5">
              No Products in Cart
              <Link to="/shop"> Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h3 style={{ color: "#001529", fontSize: "25px" }}>Order Summary</h3>
          <hr />
          <h3 style={{ color: "#001529", fontSize: "18px" }}>
            Products ({cartItems.length})
          </h3>
          {cartItems.length > 0 &&
            cartItems.map((c, i) => (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = Rs.{c.price * c.count}
                </p>
              </div>
            ))}
          {cartItems.length > 0 && (
            <>
              <hr />
              Total : <b>Rs. {getTotal()}</b>
            </>
          )}

          <hr />
          {userInfo ? (
            <Button
              className="mt-2"
              icon={<i className="fas fa-shopping-bag p-1"></i>}
              size="large"
              style={{ backgroundColor: "#001529", color: "white" }}
              onClick={saveOrderToDb}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          ) : (
            <Button
              className="mt-2"
              icon={<i className="fas fa-sign-in-alt p-1"></i>}
              size="large"
              style={{ backgroundColor: "rgb(64, 169, 255)", color: "white" }}
            >
              <Link to={{ pathname: "/login", state: { from: "/cart" } }}>
                <span className="h6" style={{ color: "white" }}>
                  Login to Checkout
                </span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
