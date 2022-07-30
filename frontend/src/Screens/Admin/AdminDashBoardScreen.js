import React, { useEffect } from "react";
import AdminNav from "../../Components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import { listOrders, updateOrder } from "../../Actions/orderAction";
import { ORDER_UPDATE_RESET } from "../../Constants/orderConstant";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { listBrands } from "../../Actions/brandAction";
import Meta from "../../Components/Meta";
import { Card, Alert, Select } from "antd";
const { Option } = Select;

const AdminDashBoardScreen = () => {
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const { success } = orderUpdate;

  const dispatch = useDispatch();

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_UPDATE_RESET });
    }

    dispatch(listOrders());
    dispatch(listBrands());
  }, [dispatch, success]);

  const handleStatusChange = (orderId, orderStatus) => {
    dispatch(updateOrder(orderId, orderStatus));
  };

  return (
    <div className="container-fluid">
      <Meta title="Electroo: Admin Dashboard" />
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h3 className=" text-center " style={{ marginTop: 60 }}>
            All Orders
          </h3>
          <div className="underline"></div>
          {orders &&
            orders.length > 0 &&
            orders.map((order, i) => {
              let alertColor = "error";
              if (order.orderStatus === "Not Processed") {
                alertColor = "error";
              } else if (order.orderStatus === "Processing") {
                alertColor = "warning";
              } else if (order.orderStatus === "Dispatched") {
                alertColor = "warning";
              } else if (order.orderStatus === "Cancelled") {
                alertColor = "info";
              } else if (order.orderStatus === "Delievered") {
                alertColor = "success";
              }
              return (
                <Card className="mt-4 mb-3" key={i}>
                  <Alert
                    message={`Order Status  :  ${order.orderStatus.toUpperCase()}`}
                    type={alertColor}
                    className="mt-1 mb-4"
                  />
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <span className="text-muted mb-4">
                        <b>Order Id</b> : {order.paymentIntent.id}
                      </span>
                      <br />
                      <span className="text-muted mb-4">
                        <b>Amount</b> :{" "}
                        {(order.paymentIntent.amount / 100).toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "INR",
                          }
                        )}
                      </span>
                      <br />
                      <span className="text-muted mb-4">
                        <b>Currency</b> :{" "}
                        {order.paymentIntent.currency.toUpperCase()}
                      </span>
                      <br />
                      <span className="text-muted mb-4">
                        <b>Payment method</b> :{" "}
                        {order.paymentIntent.payment_method_types[0]}
                      </span>
                      <br />
                      <span className="text-muted mb-4">
                        <b>Ordered on</b> :{" "}
                        {new Date(
                          order.paymentIntent.created * 1000
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="col-md-8">
                      <div className="row mt-2 mb-2 ">
                        <h6 className="mt-1 mr-4 text-muted">
                          Change Status :{" "}
                        </h6>
                        <Select
                          onChange={(value) =>
                            handleStatusChange(order._id, value)
                          }
                          defaultValue={order.orderStatus}
                          style={{ width: 360 }}
                        >
                          <Option value="Not Processed">Not Processed</Option>
                          <Option value="Processing">Processing</Option>
                          <Option value="Dispatched">Dispatched</Option>
                          <Option value="Cancelled">Cancelled</Option>
                          <Option value="Delievered">Delievered</Option>
                        </Select>
                      </div>
                      <div className="row table-responsive">
                        <table className="table table-bordered mt-2">
                          <thead className="thead-light ">
                            <tr>
                              <th className="text-center">Name</th>
                              <th className="text-center">Price</th>
                              <th className="text-center">Brand</th>
                              <th className="text-center">Color</th>
                              <th className="text-center">Count</th>
                              <th className="text-center">Shipping</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order &&
                              order.products &&
                              order.products.length > 0 &&
                              order.products.map((p, i) => (
                                <tr key={i}>
                                  <td className="text-center">
                                    {p.product?.title}
                                  </td>
                                  <td className="text-center">
                                    {p.product?.price}
                                  </td>
                                  {brands
                                    .filter((b) => b._id === p.product?.brand)
                                    .map((item, i) => (
                                      <td key={i} className="text-center">
                                        {item.name}
                                      </td>
                                    ))}
                                  <td className="text-center">{p.color}</td>
                                  <td className="text-center">{p.count}</td>
                                  <td className="text-center">
                                    {p.product?.shipping === "Yes" ? (
                                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    ) : (
                                      <CloseCircleTwoTone twoToneColor="#E74C3C" />
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoardScreen;
