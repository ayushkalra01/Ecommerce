import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./Reducers/UserReducer";
import {
  categoryCreateReducer,
  categoryListReducer,
  categoryDetailsReducer,
  categoryDeleteReducer,
  categoryUpdateReducer,
} from "./Reducers/CategoryReducer";
import {
  subCategoryCreateReducer,
  subCategoryListReducer,
  subCategoryDeleteReducer,
  subCategoryDetailsReducer,
  subCategoryUpdateReducer,
} from "./Reducers/SubCategoryReducer";
import {
  brandCreateReducer,
  brandListReducer,
  brandDetailsReducer,
  brandUpdateReducer,
  brandDeleteReducer,
} from "./Reducers/BrandReducer";
import {
  productCreateReducer,
  productListReducer,
  productSortedListReducer,
  productDeleteReducer,
  productDetailsReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productRelatedReducer,
} from "./Reducers/ProductReducer";

import {
  searchReducer,
  searchFilterProductsReducer,
} from "./Reducers/SearchReducer";

import {
  cartReducer,
  cartDrawerReducer,
  applyCouponReducer,
} from "./Reducers/CartReducer";

import {
  orderCreateReducer,
  orderUserListReducer,
  orderListReducer,
  orderUpdateReducer,
} from "./Reducers/oderReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetails: categoryDetailsReducer,
  categoryList: categoryListReducer,
  categoryUpdate: categoryUpdateReducer,
  subCategoryCreate: subCategoryCreateReducer,
  subCategoryList: subCategoryListReducer,
  subCategoryDelete: subCategoryDeleteReducer,
  subCategoryUpdate: subCategoryUpdateReducer,
  subCategoryDetails: subCategoryDetailsReducer,
  brandCreate: brandCreateReducer,
  brandDelete: brandDeleteReducer,
  brandUpdate: brandUpdateReducer,
  brandDetails: brandDetailsReducer,
  brandList: brandListReducer,
  productCreate: productCreateReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productSortedList: productSortedListReducer,
  productReviewCreate: productReviewCreateReducer,
  productRelated: productRelatedReducer,
  search: searchReducer,
  searchFilterProducts: searchFilterProductsReducer,
  cart: cartReducer,
  cartDrawer: cartDrawerReducer,
  applyCoupon: applyCouponReducer,
  orderCreate: orderCreateReducer,
  orderUserList: orderUserListReducer,
  orderList: orderListReducer,
  orderUpdate: orderUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
