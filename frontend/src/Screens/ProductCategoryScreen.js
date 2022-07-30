import React, { useEffect, useState } from "react";
import { getProductByCategories } from "../axios/products";
import UserProductCard from "../Components/cards/UserProductCard";
import LoadingCard from "../Components/cards/LoadingCard";
import { Pagination } from "antd";
import { toast } from "react-toastify";
import Meta from "../Components/Meta";

const ProductCategoryScreen = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const productSlug = match.params.slug;

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, [page, productSlug]);

  const loadProducts = () => {
    setLoading(true);
    getProductByCategories(productSlug, page)
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
    <div className="container">
      <Meta title={`Product: ${productSlug}`} />
      <div className="row">
        <div className="col">
          <h3 style={{ textAlign: "center", marginTop: 60, color: "#001529" }}>
            {productSlug}
          </h3>
          <div className="underline"></div>
        </div>
      </div>
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="row">
          {products.length &&
            products.map((p) => (
              <div className="col-md-4" key={p._id}>
                <UserProductCard product={p} />
              </div>
            ))}
        </div>
      )}

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

export default ProductCategoryScreen;
