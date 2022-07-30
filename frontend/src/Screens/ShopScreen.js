import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../Actions/productAction";
import { listSearchProducts } from "../Actions/searchAction";
import { listCategories } from "../Actions/categoryAction";
import { listSubCategories } from "../Actions/subCategoryAction";
import { listBrands } from "../Actions/brandAction";
import UserProductCard from "../Components/cards/UserProductCard";
// import { SEARCH_QUERY } from "../Constants/searchConstant";
import { Menu, Slider, Checkbox, Pagination } from "antd";
import {
  DollarOutlined,
  LoadingOutlined,
  DownSquareOutlined,
  StarOutlined,
  TagsOutlined,
  BgColorsOutlined,
  TransactionOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import { Spin, Radio, Space } from "antd";
import StarRatings from "react-star-ratings";
import Meta from "../Components/Meta";
const { SubMenu } = Menu;
const { Group } = Radio;

const ShopScreen = () => {
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const [rating, setRating] = useState(0);
  const [sub, setSub] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [ship, setShip] = useState("");
  const [defaultPage, setDefaultPage] = useState(1);
  const [filterPage, setFilterPage] = useState(1);
  const colors = [
    "Red",
    "Green",
    "Blue",
    "Black",
    "Brown",
    "Silver",
    "White",
    "Grey",
  ];
  const shipping = ["Yes", "No"];

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {
    products: defaultProducts,
    loading: loadingDefault,
    pages: defaultPages,
  } = productList;

  const search = useSelector((state) => state.search);
  const { text } = search;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;

  const searchFilterProducts = useSelector(
    (state) => state.searchFilterProducts
  );
  const {
    products: filterProducts,
    loading: loadingFilter,
    pages: filterPages,
  } = searchFilterProducts;

  const handleSlider = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  useEffect(() => {
    dispatch(listProducts("all", defaultPage));
  }, [dispatch, defaultPage]);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubCategories());
    dispatch(listBrands());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => {
      dispatch(
        listSearchProducts({
          query: text,
          price,
          category: categoryIds,
          rating,
          sub,
          brand,
          color,
          ship,
          page: filterPage,
        })
      );
    }, 300);
    return () => clearTimeout(timeout);
    //eslint-disable-next-line
  }, [
    dispatch,
    text,
    ok,
    categoryIds,
    rating,
    sub,
    brand,
    color,
    ship,
    filterPage,
  ]);

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCategoryChange}
          className="pr-4 pl-4 pb-2"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  const handleCategoryChange = (e) => {
    let prevIds = [...categoryIds];
    let justChecked = e.target.value;
    let alreadyFound = prevIds.indexOf(justChecked);
    if (alreadyFound === -1) {
      prevIds.push(justChecked);
    } else {
      //which index we want to take out
      // how many items we want to take out
      prevIds.splice(alreadyFound, 1);
    }
    setCategoryIds(prevIds);
  };
  const stars = [5, 4, 3, 2, 1];
  const showStars = () =>
    stars.map((s, i) => {
      return (
        <div
          className="pr-4 pl-4 pb-2"
          key={i}
          style={{
            backgroundColor: "white",
          }}
        >
          <StarRatings
            numberOfStars={s}
            starEmptyColor="#ffa41c"
            starHoverColor="#ffa41c"
            starDimension="18px"
            starSpacing="5px"
            changeRating={() => handleStar(s)}
          />
        </div>
      );
    });

  const handleStar = (value) => {
    setRating(value);
  };

  const showSubCategories = () =>
    subCategories.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSubChange(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSubChange = (s) => {
    setSub(s);
  };

  const handleClear = () => {
    setPrice([0, 0]);
    setCategoryIds([]);
    setRating(0);
    setSub("");
    setBrand("");
    setColor("");
    setShip("");
  };

  return (
    <Spin
      spinning={loadingDefault === true || loadingFilter === true}
      indicator={antIcon}
    >
      <div className="container-fluid">
        <Meta title="Electroo: Shop" />
        <div className="row">
          <div className="col-md-3 pt-2">
            <div style={{ marginTop: 60 }}>
              <span className="h4">Filters</span>
              <span className="btn btn-info float-right" onClick={handleClear}>
                Clear
              </span>
            </div>
            <hr />

            <Menu
              defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
              mode="inline"
            >
              {/* price */}

              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DollarOutlined /> Price
                  </span>
                }
              >
                <span style={{ backgroundColor: "white" }}>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `Rs. ${v}`}
                    range
                    value={price}
                    max="99999"
                    onChange={handleSlider}
                  />
                </span>
              </SubMenu>

              {/* categories */}
              <SubMenu
                key="2"
                className="mb-3 mt-3"
                title={
                  <span className="h6">
                    <DownSquareOutlined />
                    Categories
                  </span>
                }
              >
                <div style={{ backgroundColor: "white" }}>
                  {showCategories()}
                </div>
              </SubMenu>

              {/* Ratings */}
              <SubMenu
                key="3"
                className="mb-3 mt-3"
                title={
                  <span className="h6">
                    <StarOutlined />
                    Ratings
                  </span>
                }
              >
                {showStars()}
              </SubMenu>

              {/* SubCatgeory */}
              <SubMenu
                key="4"
                className="mb-3 mt-3"
                title={
                  <span className="h6">
                    <TagsOutlined />
                    Sub Categories
                  </span>
                }
              >
                <div style={{ backgroundColor: "white" }} className="pl-4 pr-4">
                  {showSubCategories()}
                </div>
              </SubMenu>

              {/* Brands */}
              <SubMenu
                key="5"
                className="mb-3 mt-3"
                title={
                  <span className="h6">
                    <AntDesignOutlined />
                    Brands
                  </span>
                }
              >
                <div
                  style={{
                    backgroundColor: "white",
                    maxHeight: "200px",
                    overflow: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  <Group
                    name="brand"
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                    value={brand}
                  >
                    <Space direction="vertical">
                      {brands && brands.length > 0
                        ? brands.map((c) => {
                            return (
                              <Radio
                                key={c._id}
                                value={c._id}
                                className="pb-2 pr-4 pl-4"
                              >
                                {c.name}
                              </Radio>
                            );
                          })
                        : null}
                    </Space>
                  </Group>
                </div>
              </SubMenu>

              {/* Colors */}
              <SubMenu
                key="6"
                className="mb-3 mt-3"
                title={
                  <span className="h6">
                    <BgColorsOutlined />
                    Colors
                  </span>
                }
              >
                <div
                  style={{
                    backgroundColor: "white",
                    maxHeight: "200px",
                    overflow: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  <Group
                    name="color"
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                    value={color}
                  >
                    <Space direction="vertical">
                      {colors && colors.length > 0
                        ? colors.map((c, i) => {
                            return (
                              <Radio
                                key={i}
                                value={c}
                                className="pb-2 pr-4 pl-4"
                              >
                                {c}
                              </Radio>
                            );
                          })
                        : null}
                    </Space>
                  </Group>
                </div>
              </SubMenu>

              {/* Shipping */}
              <SubMenu
                key="7"
                className="mb-3 mt-3"
                title={
                  <span className="h6">
                    <TransactionOutlined />
                    Shipping
                  </span>
                }
              >
                <div style={{ backgroundColor: "white" }}>
                  <Group
                    name="ship"
                    onChange={(e) => {
                      setShip(e.target.value);
                    }}
                    value={ship}
                  >
                    <Space direction="vertical">
                      {shipping.map((c, i) => {
                        return (
                          <Radio
                            key={i}
                            value={c}
                            onChange={(e) => {
                              setShip(e.target.value);
                            }}
                            className="pb-2 pr-4 pl-4"
                          >
                            {c}
                          </Radio>
                        );
                      })}
                    </Space>
                  </Group>
                </div>
              </SubMenu>
            </Menu>
          </div>
          <div className="col-md-9 pt-2">
            <h3
              style={{ marginTop: 60, color: "#001529", textAlign: "center" }}
            >
              Products
            </h3>
            <div className="underline"></div>

            {/* Products */}

            <div className="row mt-2">
              {text.length === 0 &&
              price[0] === 0 &&
              price[1] === 0 &&
              categoryIds.length === 0 &&
              rating === 0 &&
              sub === "" &&
              brand === "" &&
              color === "" &&
              ship === "" ? (
                defaultProducts &&
                defaultProducts.length > 0 &&
                defaultProducts.map((p) => (
                  <div className="col-md-4 mb-5" key={p._id}>
                    <UserProductCard product={p} />
                  </div>
                ))
              ) : filterProducts && filterProducts.length > 0 ? (
                filterProducts.map((p) => (
                  <div className="col-md-4 mb-5" key={p._id}>
                    <UserProductCard product={p} />
                  </div>
                ))
              ) : (
                <div className="text-center col mt-5 mb-5">
                  <p>No Products Found</p>
                </div>
              )}
            </div>

            {/* Pagination */}

            {text.length === 0 &&
            price[0] === 0 &&
            price[1] === 0 &&
            categoryIds.length === 0 &&
            rating === 0 &&
            sub === "" &&
            brand === "" &&
            color === "" &&
            ship === ""
              ? defaultProducts &&
                defaultProducts.length > 0 && (
                  <div className="row">
                    <nav className="col-md-4 offset-md-4 text-center pt-2 p-3 mb-3">
                      <Pagination
                        current={defaultPage}
                        total={defaultPages * 10}
                        onChange={(value) => setDefaultPage(value)}
                      />
                    </nav>
                  </div>
                )
              : filterProducts &&
                filterProducts.length > 0 && (
                  <div className="row">
                    <nav className="col-md-4 offset-md-4 text-center pt-2 p-3 mb-3">
                      <Pagination
                        current={filterPage}
                        total={filterPages * 10}
                        onChange={(value) => setFilterPage(value)}
                      />
                    </nav>
                  </div>
                )}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ShopScreen;
