import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts, deleteProduct } from "../../../Actions/productAction";
import AdminNav from "../../../Components/nav/AdminNav";
import AdminProductCard from "../../../Components/cards/AdminProductCard";
import { listCategories } from "../../../Actions/categoryAction";
import LoadingCard from "../../../Components/cards/LoadingCard";
import { Pagination } from "antd";
import Meta from "../../../Components/Meta";

const ProductListScreen = ({ match }) => {
  const productList = useSelector((state) => state.productList);
  const { loading: loadingList, products, pages } = productList;

  const [page, setPage] = useState(1);

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const [category, setCategory] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProducts(category, page));
  }, [dispatch, category, successDelete, page]);

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteProduct(slug));
    }
  };
  return (
    <div className="container-fluid">
      <Meta title="Electroo: Products" />
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 offset-md-1">
          {products.length > 0 ? (
            <h3
              style={{ textAlign: "center", marginTop: 60, color: "#001529" }}
            >
              All Products
            </h3>
          ) : (
            <h3
              style={{ textAlign: "center", marginTop: 60, color: "#40a9ff" }}
            >
              No Product Found
            </h3>
          )}
          <div className="underline"></div>
          <div className="form-group">
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Please select a category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          {loadingList ? (
            <LoadingCard count={6} />
          ) : (
            products.length > 0 && (
              <div className="row">
                {products.map((product) => {
                  return (
                    <div key={product._id} className="col-md-4">
                      <AdminProductCard
                        product={product}
                        handleDelete={handleDelete}
                      />
                    </div>
                  );
                })}
              </div>
            )
          )}

          {products && products.length > 0 && (
            <div className="row">
              <nav className="col-md-4 offset-md-4 text-center pt-2 p-3 mb-3">
                <Pagination
                  current={page}
                  total={pages * 10}
                  onChange={(value) => setPage(value)}
                />
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListScreen;

// .filter((p) => {
//   if (category !== "") {
//     return p.category._id === category;
//   } else return p;
// })
