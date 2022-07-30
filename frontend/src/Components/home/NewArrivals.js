import React, { useEffect, useState } from "react";
import UserProductCard from "../cards/UserProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import { toast } from "react-toastify";
import { getSortedProducts } from "../../axios/products";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, [page]);

  const loadProducts = () => {
    setLoading(true);
    getSortedProducts("createdAt", "desc", page)
      .then((res) => {
        setProducts(res.data.products);
        setPage(res.data.page);
        setTotal(res.data.pages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="products-container">
      <div className="container">
        <div className="row">&nbsp;</div>
        <h2
          className="text-center font-weight-bold p-3 mb-3 mt-2"
          style={{ color: "rgb(0, 21, 41)", textTransform: "uppercase" }}
        >
          New <span style={{ color: "#40a9ff" }}>Arrivals</span>
        </h2>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mb-2">
                <UserProductCard product={product} loading={loading} />
              </div>
            ))}
          </div>
        )}
      </div>
      {products && products.length > 0 && (
        <div className="row">
          <nav className="col-md-4 offset-md-4 text-center pt-2 p-3 mb-3">
            <Pagination
              current={page}
              total={total * 10}
              onChange={(value) => setPage(value)}
            />
          </nav>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
