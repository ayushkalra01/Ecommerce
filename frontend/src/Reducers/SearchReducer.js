import {
  SEARCH_QUERY,
  SEARCH_QUERY_RESET,
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_RESET,
} from "../Constants/searchConstant";
export const searchReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      return { ...state, ...action.payload };
    case SEARCH_QUERY_RESET:
      return {};
    default:
      return state;
  }
};

export const searchFilterProductsReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case SEARCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case SEARCH_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case SEARCH_PRODUCT_RESET:
      return { products: [] };
    default:
      return state;
  }
};
