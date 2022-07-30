import React, { useEffect } from "react";
import Jumbotron from "../Components/Jumbotron";
import NewArrivals from "../Components/home/NewArrivals";
import BestSellers from "../Components/home/BestSellers";
import TopRated from "../Components/home/TopRated";
import { Link } from "react-router-dom";
import { listCategories } from "../Actions/categoryAction";
import { listSubCategories } from "../Actions/subCategoryAction";
import { listBrands } from "../Actions/brandAction";
import { useDispatch } from "react-redux";
import Meta from "../Components/Meta";
// import Collections from "../Components/Collections";
import Footer from "../Components/Footer";
import camera from "../images/c3.jpg";
import mobile from "../images/m1.jpg";
import headphones from "../images/headphones.jpg";
import { Carousel, Button } from "antd";

const HomeScreen = () => {
  const text = [
    "Latest Products",
    "Top Rated Products",
    "Best Selling Products",
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubCategories());
    dispatch(listBrands());
  }, [dispatch]);

  return (
    <div className="home">
      <Meta title="Welcome to Electroo || Home" />
      <div className="hero">
        <div className="hero-banner">
          <h1 className="font-weight-bold mt-3">
            Electroo<span>.</span>
          </h1>

          <h2 className="mb-5 mt-3">
            <Jumbotron text={text} />
          </h2>

          <Link to="/shop" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </div>

      <TopRated className="mb-5" />

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 mt-5">
            <h3 className="mb-4" style={{ color: "rgb(0, 21, 41)" }}>
              Up to{" "}
              <span className="display-3" style={{ color: "rgb(64,169,255)" }}>
                <strong>40% </strong>
              </span>
              off
            </h3>

            <p style={{ maxWidth: "26rem" }}>
              Apply Coupon{" "}
              <b style={{ color: "rgb(64,169,255)" }}>ELECTROFOREVER </b> Offer
              valid for limited time period T&C applied
            </p>
            <Button
              className="mt-2 mb-4"
              size="large"
              style={{ backgroundColor: "rgb(0, 21, 41)", color: "white" }}
            >
              <Link to="/shop">
                <i className="fas fa-shopping-bag p-1"></i> Shop Now
              </Link>
            </Button>
          </div>
          <div className="col-md-8 offset-md-1">
            <Carousel autoplay>
              <div>
                <img
                  src={headphones}
                  alt=""
                  width="100%"
                  height="400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={camera}
                  alt=""
                  width="100%"
                  height="400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <img
                  src={mobile}
                  alt=""
                  width="100%"
                  height="400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      <NewArrivals className="mb-5" />
      {/* <Collections className="mb-5" /> */}
      <BestSellers className="mb-5" />

      <Footer />
    </div>
  );
};

export default HomeScreen;
