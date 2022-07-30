import React, { lazy, Suspense } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "./Actions/userActions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Components/nav/Header";
import { LoadingOutlined } from "@ant-design/icons";
import CartDrawer from "./Components/CartDrawer";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// import UserRoute from "./Components/protectedRoute/UserRoute";
// import AdminRoute from "./Components/protectedRoute/AdminRoute";
// import HomeScreen from "./Screens/HomeScreen";
// import ProductScreen from "./Screens/ProductScreen";
// import ProductCategoryScreen from "./Screens/ProductCategoryScreen";
// import ProductSubCategoryScreen from "./Screens/ProductSubCategoryScreen";
// import ProductBrandScreen from "./Screens/ProductBrandScreen";
// import ShopScreen from "./Screens/ShopScreen";
// import CartScreen from "./Screens/CartScreen";
// import PaymentScreen from "./Screens/PaymentScreen";
// import LoginScreen from "./Screens/Auth/LoginScreen";
// import ForgotPasswordScreen from "./Screens/Auth/ForgotPasswordScreen";
// import RegisterCompleteScreen from "./Screens/Auth/RegisterCompleteScreen";
// import RegisterScreen from "./Screens/Auth/RegisterScreen";
// import UpdatePasswordScreen from "./Screens/Auth/UpdatePasswordScreen";
// import AdminDashBoardScreen from "./Screens/Admin/AdminDashBoardScreen";
// import CategoryCreateScreen from "./Screens/Admin/category/CategoryCreateScreen";
// import CategoryEditScreen from "./Screens/Admin/category/CategoryEditScreen";
// import SubCategoryCreateScreen from "./Screens/Admin/subCategory/SubCategoryCreateScreen";
// import SubCategoryEditScreen from "./Screens/Admin/subCategory/SubCategoryEditScreen";
// import ProductCreateScreen from "./Screens/Admin/product/ProductCreateScreen";
// import ProductListScreen from "./Screens/Admin/product/ProductListScreen";
// import ProductEditScreen from "./Screens/Admin/product/ProductEditScreen";
// import BrandCreateScreen from "./Screens/Admin/brand/BrandCreateScreen";
// import BrandEditScreen from "./Screens/Admin/brand/BrandEditScreen";
// import CouponCreateScreen from "./Screens/Admin/coupons/CouponCreateScreen";
// import WishlistScreen from "./Screens/User/WishlistScreen";
// import HistoryScreen from "./Screens/User/HistoryScreen";
// import CheckoutScreen from "./Screens/CheckoutScreen";
// import NotFound from "./Components/NotFound";
// import PaymentSuccess from "./Components/PaymentSuccess";

// With Lazy
const HomeScreen = lazy(() => import("./Screens/HomeScreen"));
const ProductScreen = lazy(() => import("./Screens/ProductScreen"));
const ProductCategoryScreen = lazy(() =>
  import("./Screens/ProductCategoryScreen")
);
const ProductSubCategoryScreen = lazy(() =>
  import("./Screens/ProductSubCategoryScreen")
);
const ProductBrandScreen = lazy(() => import("./Screens/ProductBrandScreen"));
const ShopScreen = lazy(() => import("./Screens/ShopScreen"));
const CartScreen = lazy(() => import("./Screens/CartScreen"));
const PaymentScreen = lazy(() => import("./Screens/PaymentScreen"));

// Protected Route
const UserRoute = lazy(() => import("./Components/protectedRoute/UserRoute"));
const AdminRoute = lazy(() => import("./Components/protectedRoute/AdminRoute"));

// Auth Screens
const LoginScreen = lazy(() => import("./Screens/Auth/LoginScreen"));
const ForgotPasswordScreen = lazy(() =>
  import("./Screens/Auth/ForgotPasswordScreen")
);
const RegisterCompleteScreen = lazy(() =>
  import("./Screens/Auth/RegisterCompleteScreen")
);
const RegisterScreen = lazy(() => import("./Screens/Auth/RegisterScreen"));
const UpdatePasswordScreen = lazy(() =>
  import("./Screens/Auth/UpdatePasswordScreen")
);

// Admin Screens
const AdminDashBoardScreen = lazy(() =>
  import("./Screens/Admin/AdminDashBoardScreen")
);
const CategoryCreateScreen = lazy(() =>
  import("./Screens/Admin/category/CategoryCreateScreen")
);
const CategoryEditScreen = lazy(() =>
  import("./Screens/Admin/category/CategoryEditScreen")
);
const SubCategoryCreateScreen = lazy(() =>
  import("./Screens/Admin/subCategory/SubCategoryCreateScreen")
);
const SubCategoryEditScreen = lazy(() =>
  import("./Screens/Admin/subCategory/SubCategoryEditScreen")
);
const ProductCreateScreen = lazy(() =>
  import("./Screens/Admin/product/ProductCreateScreen")
);
const ProductListScreen = lazy(() =>
  import("./Screens/Admin/product/ProductListScreen")
);
const ProductEditScreen = lazy(() =>
  import("./Screens/Admin/product/ProductEditScreen")
);
const BrandCreateScreen = lazy(() =>
  import("./Screens/Admin/brand/BrandCreateScreen")
);
const BrandEditScreen = lazy(() =>
  import("./Screens/Admin/brand/BrandEditScreen")
);
const CouponCreateScreen = lazy(() =>
  import("./Screens/Admin/coupons/CouponCreateScreen")
);

// User Screens
const WishlistScreen = lazy(() => import("./Screens/User/WishlistScreen"));
const HistoryScreen = lazy(() => import("./Screens/User/HistoryScreen"));
const CheckoutScreen = lazy(() => import("./Screens/CheckoutScreen"));

const NotFound = lazy(() => import("./Components/NotFound"));
const PaymentSuccess = lazy(() => import("./Components/PaymentSuccess"));

const App = () => {
  const dispatch = useDispatch();

  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within range of 2XX  cause this function to trigger
      return response;
    },
    function (error) {
      // any status code that falls outside within range of 2XX  cause this function to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          console.log("Logout ");
          dispatch(logout());
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <Suspense
        fallback={
          <div className="col text-center p-5 display-4">
            __Ele <LoadingOutlined /> ctro__
          </div>
        }
      >
        <Header />
        <CartDrawer />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/shop" component={ShopScreen} />
          <Route exact path="/product/:slug" component={ProductScreen} />
          <Route
            exact
            path="/product/category/:slug"
            component={ProductCategoryScreen}
          />
          <Route
            exact
            path="/product/subcategory/:slug"
            component={ProductSubCategoryScreen}
          />
          <Route
            exact
            path="/product/brand/:slug"
            component={ProductBrandScreen}
          />
          <UserRoute exact path="/checkout" component={CheckoutScreen} />
          <UserRoute exact path="/payment" component={PaymentScreen} />
          <UserRoute exact path="/payment/success" component={PaymentSuccess} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/register/complete"
            component={RegisterCompleteScreen}
          />
          <Route
            exact
            path="/forgot/password"
            component={ForgotPasswordScreen}
          />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashBoardScreen}
          />
          <AdminRoute
            exact
            path="/admin/category"
            component={CategoryCreateScreen}
          />
          <AdminRoute
            exact
            path="/admin/category/:slug"
            component={CategoryEditScreen}
          />
          <AdminRoute
            exact
            path="/admin/subcategory"
            component={SubCategoryCreateScreen}
          />
          <AdminRoute
            exact
            path="/admin/subcategory/:slug"
            component={SubCategoryEditScreen}
          />
          <AdminRoute exact path="/admin/brand" component={BrandCreateScreen} />
          <AdminRoute
            exact
            path="/admin/brand/:slug"
            component={BrandEditScreen}
          />
          <AdminRoute
            exact
            path="/admin/product"
            component={ProductCreateScreen}
          />
          <AdminRoute
            exact
            path="/admin/products"
            component={ProductListScreen}
          />
          <AdminRoute
            exact
            path="/admin/coupon"
            component={CouponCreateScreen}
          />

          <AdminRoute
            exact
            path="/admin/product/:slug"
            component={ProductEditScreen}
          />

          <UserRoute exact path="/user/history" component={HistoryScreen} />
          <UserRoute
            exact
            path="/user/update/password"
            component={UpdatePasswordScreen}
          />
          <UserRoute exact path="/user/wishlist" component={WishlistScreen} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
