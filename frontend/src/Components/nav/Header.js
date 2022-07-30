import React, { useState, useEffect } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import SearchForm from "../forms/SearchForm";

import { useDispatch, useSelector } from "react-redux";

import { useHistory, Link } from "react-router-dom";

import { logout } from "../../Actions/userActions";

import { listCategories } from "../../Actions/categoryAction";
import { listSubCategories } from "../../Actions/subCategoryAction";
import { listBrands } from "../../Actions/brandAction";

import icon from "../../images/ICON.png";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("Home");

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleClick = (e) => {
    setCurrent(e.key.toString());
  };

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubCategories());
    dispatch(listBrands());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <Item
        key="Home"
        icon={
          <img
            src={icon}
            alt="Home"
            style={{ height: "22px", marginBottom: "4px" }}
          />
        }
      >
        <Link to="/">
          {userInfo ? <span>Home</span> : <span>Electroo</span>}
        </Link>
      </Item>

      <SubMenu icon={<AppstoreOutlined />} title="Items" key="items">
        <SubMenu key="category" title="Categories">
          {categories &&
            categories.length > 0 &&
            categories.map((c) => {
              return (
                <Item key={c._id}>
                  <Link to={`/product/category/${c.slug}`}>{c.name}</Link>
                </Item>
              );
            })}
        </SubMenu>
        <SubMenu key="subcategory" title="Subcategories">
          {subCategories &&
            subCategories.length > 0 &&
            subCategories.map((c) => {
              return (
                <Item key={c._id}>
                  <Link to={`/product/subcategory/${c.slug}`}>{c.name}</Link>
                </Item>
              );
            })}
        </SubMenu>
        <SubMenu key="brand" title="Brands">
          {brands &&
            brands.length > 0 &&
            brands.map((c) => {
              return (
                <Item key={c._id}>
                  <Link to={`/product/brand/${c.slug}`}>{c.name}</Link>
                </Item>
              );
            })}
        </SubMenu>
      </SubMenu>

      <Item key="Shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="Cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge
            count={cartItems.length}
            offset={[10, 0]}
            style={{ backgroundColor: "white" }}
          >
            <span style={{ color: "white" }}>Cart</span>
          </Badge>
        </Link>
      </Item>

      {userInfo && (
        <SubMenu
          icon={<SettingOutlined />}
          title={userInfo && userInfo.email.split("@")[0]}
          className="float-right"
        >
          {userInfo && userInfo.role === "Ecommerce_Admin" && (
            <Item key="AdminDashboard">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          {userInfo && userInfo.role === "customer" && (
            <Item key="UserDashboard">
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logoutHandler}>
            Logout
          </Item>
        </SubMenu>
      )}

      {!userInfo && (
        <Item key="Register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!userInfo && (
        <Item key="Login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      <span className="float-right p-1">
        <SearchForm />
      </span>
    </Menu>
  );
};

export default Header;
