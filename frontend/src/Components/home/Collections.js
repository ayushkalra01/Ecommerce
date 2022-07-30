import React from "react";
import { Link } from "react-router-dom";
const Collections = () => {
  return (
    <div className="collections section-center">
      <div className="collection-Laptop">
        <div className="p-2 mt-3">
          <h4
            className="display-4 font-weight-bold"
            style={{ color: "white", maxWidth: "2rem" }}
          >
            Laptops Collection
          </h4>
          <Link to="/">
            <h6 style={{ color: "white" }}>
              Shop Now <i className="fas fa-arrow-circle-right"></i>
            </h6>
          </Link>
        </div>
      </div>
      <div className="collection-Camera">
        <div className="p-2 mt-3">
          <h4
            className="display-4 font-weight-bold"
            style={{ color: "white", maxWidth: "2rem" }}
          >
            Cameras Collection
          </h4>
          <Link to="/">
            <h6 style={{ color: "white" }}>
              Shop Now <i className="fas fa-arrow-circle-right"></i>
            </h6>
          </Link>
        </div>
      </div>
      <div className="collection-Headset">
        <div className="p-2 mt-3">
          <h4
            className="display-4 font-weight-bold"
            style={{ color: "white", maxWidth: "2rem" }}
          >
            Headsets Collection
          </h4>
          <Link to="/">
            <h6 style={{ color: "white" }}>
              Shop Now <i className="fas fa-arrow-circle-right"></i>
            </h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Collections;
