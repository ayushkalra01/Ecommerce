import React, { useEffect } from "react";
import UserNav from "../../Components/nav/UserNav";
import { userListOrder } from "../../Actions/orderAction";
import { listBrands } from "../../Actions/brandAction";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DownloadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../Components/Invoice";
import ModalImage from "react-modal-image";
import Meta from "../../Components/Meta";
import { Result, Button, Card, Alert, Modal } from "antd";

const HistoryScreen = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userListOrder());
    dispatch(listBrands());
  }, [dispatch]);

  const orderUserList = useSelector((state) => state.orderUserList);
  const { orders } = orderUserList;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  //payment info modal
  const paymentModal = (order) =>
    Modal.info({
      title: `Payment Info`,
      content: (
        <div>
          <span className="text-muted mb-4">
            <b>Order Id</b> : {order.paymentIntent.id}
          </span>
          <br />
          <span className="text-muted mb-4">
            <b>Amount</b> :{" "}
            {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </span>
          <br />
          <span className="text-muted mb-4">
            <b>Currency</b> : {order.paymentIntent.currency.toUpperCase()}
          </span>
          <br />
          <span className="text-muted mb-4">
            <b>Payment method</b> :{" "}
            {order.paymentIntent.payment_method_types[0]}
          </span>
          <br />
          <span className="text-muted mb-4">
            <b>Ordered on</b> :{" "}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </span>
        </div>
      ),
      onOk() {},
    });

  const showOrderDetails = (order) => (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order &&
            order.products &&
            order.products.length > 0 &&
            order.products.map((p, i) => (
              <tr key={i}>
                <td>
                  <div style={{ width: "100px", height: "auto" }}>
                    {p.product?.images.length && (
                      <ModalImage
                        small={p.product.images[0].url}
                        large={p.product.images[0].url}
                      />
                    )}
                  </div>
                </td>
                <td>
                  <b>{p.product?.title}</b>
                </td>
                <td>{p.product?.price}</td>
                {brands
                  .filter((b) => b._id === p.product.brand)
                  .map((item, i) => (
                    <td key={i}>{item.name}</td>
                  ))}
                <td>{p.product?.color}</td>
                <td>{p.count}</td>
                <td>
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
  );

  const showOrders = () =>
    orders.reverse().map((order, i) => {
      let alertColor = "error";
      if (order.orderStatus === "NOT PROCESSED") {
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
        <Card
          key={i}
          bordered={true}
          className="mt-5 mb-5 text-center"
          actions={[
            <>
              <InfoCircleOutlined
                className="text-info"
                style={{ fontSize: "16px" }}
                onClick={() => paymentModal(order)}
              />{" "}
              , Payment Info
            </>,
            <>
              <PDFDownloadLink
                document={<Invoice order={order} />}
                fileName="invoice.pdf"
              >
                <DownloadOutlined
                  className="text-info"
                  style={{ fontSize: "16px" }}
                />{" "}
                ,<br /> Download Invoice
              </PDFDownloadLink>
            </>,
          ]}
        >
          <Alert
            message={`Order Status  :  ${order.orderStatus.toUpperCase()}`}
            type={alertColor}
            className="mt-2 mb-2"
          />
          {showOrderDetails(order)}
        </Card>
      );
    });

  return (
    <div className="container-fluid">
      <Meta title="Electroo: Purchase History" />
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-8 offset-1">
          {orders.length > 0 ? (
            <>
              <h3
                style={{ textAlign: "center", marginTop: 55, color: "#001529" }}
              >
                Your Orders
              </h3>
              <div className="underline"></div>
            </>
          ) : (
            <Result
              title="No Orders Yet"
              className="mt-5 p-5"
              extra={
                <Button
                  type="primary"
                  key="shop"
                  onClick={() => history.push("/shop")}
                >
                  Shop Something
                </Button>
              }
            />
          )}
          {orders.length > 0 && showOrders()}
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
