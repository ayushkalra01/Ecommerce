import React, { useState, useEffect } from "react";
import { List, Button } from "antd";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails } from "../Actions/productAction";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const [count, setCount] = useState(1);

  const [data, setData] = useState([]);

  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductsDetails(params.slug));
  }, [dispatch, params]);

  useEffect(() => {
    if (product) {
      setData(product.reviews?.slice(0, count));
    }
  }, [product, count]);

  const handleLoadMore = () => {
    setCount((c) => c + 1);
  };

  const loadMore =
    count !== product.reviews?.length ? (
      <div
        style={{
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button
          onClick={handleLoadMore}
          disabled={count === product.reviews?.length}
          size="large"
          style={{ backgroundColor: "#001529", color: "white" }}
        >
          Load More
        </Button>
      </div>
    ) : null;

  return (
    <List
      loadMore={loadMore}
      dataSource={data}
      className="mb-3"
      renderItem={(item) => (
        <List.Item size="large">
          <ul>
            <li>
              <Rating value={item.rating} />
            </li>

            <li>
              <h6>{item.comment}</h6>
            </li>

            <li>
              <p>{item.name}</p>
            </li>
            <li>
              <p>{item.createdAt.substring(0, 10)}</p>
            </li>
          </ul>
        </List.Item>
      )}
    />
  );
};

export default Reviews;
