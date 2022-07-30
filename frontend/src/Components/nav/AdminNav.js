import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  const [current, setCurrent] = useState("/admin/dashboard");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    //eslint-disable-next-line
  }, [process.browser, window.location]);

  return (
    <>
      <nav style={{ marginTop: 55 }}>
        <ul className="nav flex-column">
          <li className="nav-item mt-2">
            <Link
              to="/admin/dashboard"
              className={`nav-link ${
                current === "/admin/dashboard" && "activee"
              }`}
            >
              <h4
                className={`text-center ${
                  current === "/admin/dashboard" ? "text-white" : "text-info"
                }`}
              >
                Dashboard
              </h4>
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link
              to="/admin/product"
              className={`nav-link ${
                current === "/admin/product" && "activee"
              }`}
            >
              <h4
                className={`text-center ${
                  current === "/admin/product" ? "text-white" : "text-info"
                }`}
              >
                Product
              </h4>
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link
              to="/admin/products"
              className={`nav-link ${
                current === "/admin/products" && "activee"
              }`}
            >
              <h4
                className={`text-center ${
                  current === "/admin/products" ? "text-white" : "text-info"
                }`}
              >
                Products
              </h4>
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link
              to="/admin/category"
              className={`nav-link ${
                current === "/admin/category" && "activee"
              }`}
            >
              <h4
                className={`text-center ${
                  current === "/admin/category" ? "text-white" : "text-info"
                }`}
              >
                Category
              </h4>
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link
              to="/admin/subcategory"
              className={`nav-link ${
                current === "/admin/subcategory" && "activee"
              }`}
            >
              <h4
                className={`text-center ${
                  current === "/admin/subcategory" ? "text-white" : "text-info"
                }`}
              >
                Sub Category
              </h4>
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link
              to="/admin/brand"
              className={`nav-link ${current === "/admin/brand" && "activee"}`}
            >
              <h4
                className={`text-center ${
                  current === "/admin/brand" ? "text-white" : "text-info"
                }`}
              >
                Brand
              </h4>
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link
              to="/admin/coupon"
              className={`nav-link ${current === "/admin/coupon" && "activee"}`}
            >
              <h4
                className={`text-center ${
                  current === "/admin/coupon" ? "text-white" : "text-info"
                }`}
              >
                Coupon
              </h4>
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link
              to="/user/update/password"
              className={`nav-link ${
                current === "/user/update/password" && "activee"
              }`}
            >
              <h4
                className={`text-center ${
                  current === "/user/update/password"
                    ? "text-white"
                    : "text-info"
                }`}
              >
                Password
              </h4>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNav;
