import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} from "../../../axios/coupon";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../Components/nav/AdminNav";
import Meta from "../../../Components/Meta";

const CouponCreateScreen = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [discount, setDiscount] = useState("");
  //eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    getAllCoupons()
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, userInfo.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry(new Date());
        toast.success(`Coupon ${res.data.name} created successfully`);
        getAllCoupons()
          .then((res) => {
            setCoupons(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove?")) {
      setLoading(true);
      deleteCoupon(id, userInfo.token).then((res) => {
        getAllCoupons()
          .then((res) => {
            setCoupons(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setLoading(false);
        toast.success(`Coupon ${res.data.name} deleted successfully`);
      });
    }
  };

  return (
    <div className="container-fluid">
      <Meta title="Electroo: Coupons" />
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h3 style={{ textAlign: "center", marginTop: 60, color: "#001529" }}>
            Coupons
          </h3>
          <div className="underline"></div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <DatePicker
                className="form-control"
                selected={expiry}
                required
                onChange={(date) => setExpiry(date)}
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-raised btn-info"
            >
              Create
            </button>
          </form>

          <br />

          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Discount</th>
                <th scope="col">Expiry</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.discount}%</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>
                    <DeleteOutlined
                      className="text-danger"
                      onClick={() => handleRemove(c._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponCreateScreen;
