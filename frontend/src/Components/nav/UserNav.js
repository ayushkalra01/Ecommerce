import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  const [current, setCurrent] = useState("/user/history");

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
              to="/user/history"
              className={`nav-link ${current === "/user/history" && "activee"}`}
            >
              <h4
                className={`text-center ${
                  current === "/user/history" ? "text-white" : "text-info"
                }`}
              >
                History
              </h4>
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link
              to="/user/wishlist"
              className={`nav-link ${
                current === "/user/wishlist" && "activee"
              }`}
            >
              <h4
                className={`text-center ${
                  current === "/user/wishlist" ? " text-white" : "text-info"
                }`}
              >
                Wishlist
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
                    ? " text-white"
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

export default UserNav;
