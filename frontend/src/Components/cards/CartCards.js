import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Actions/cartAction";
import { toast } from "react-toastify";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";

const CartCards = ({ c }) => {
  const colors = [
    "Red",
    "Green",
    "Blue",
    "Black",
    "Brown",
    "Silver",
    "White",
    "Grey",
  ];
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleColorChange = (e) => {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]._id === c._id) {
        cartItems[i].color = e.target.value;
      }
    }

    dispatch(addToCart(c));
  };

  const handleQtyChange = (e) => {
    let qty = e.target.value < 1 ? 1 : e.target.value;
    if (qty > c.quantity) {
      toast.error(`Max available quantity : ${c.quantity}`);
      return;
    }
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]._id === c._id) {
        cartItems[i].count = qty;
      }
    }
    dispatch(addToCart(c));
  };

  const handleDelete = () => {
    dispatch(removeFromCart(c));
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {c.images.length && (
              <ModalImage small={c.images[0].url} large={c.images[0].url} />
            )}
          </div>
        </td>
        <td>
          <b>{c.title}</b>
        </td>
        <td>Rs.{c.price}</td>
        <td>{c.brand.name}</td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {c.color ? (
              <option value={c.color}>{c.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((colr) => colr !== c.color)
              .map((clr) => (
                <option key={clr} value={clr}>
                  {clr}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={c.count}
            onChange={handleQtyChange}
          />
        </td>
        <td className="text-center">
          {c.shipping === "Yes" ? (
            <CheckCircleTwoTone
              twoToneColor="#52c41a"
              style={{ cursor: "pointer" }}
            />
          ) : (
            <CloseCircleTwoTone
              twoToneColor="red"
              style={{ cursor: "pointer" }}
            />
          )}
        </td>
        <td className="text-center">
          <DeleteTwoTone
            twoToneColor="#E74C3C"
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default CartCards;
