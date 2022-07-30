import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listProductsDetails,
  listRelatedProducts,
} from "../Actions/productAction";
import ProductDetails from "../Components/ProductDetails";
import UserProductCard from "../Components/cards/UserProductCard";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Constants/productConstant";
import Meta from "../Components/Meta";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ProductScreen = ({ match }) => {
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading: loadingDetails } = productDetails;

  const productRelated = useSelector((state) => state.productRelated);
  const { products: relatedProduct, loading: loadingRelated } = productRelated;

  const dispatch = useDispatch();

  const productSlug = match.params.slug;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successReview, loading: loadingReview } =
    productReviewCreate;

  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (successReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductsDetails(productSlug));

    dispatch(listRelatedProducts(productSlug));
  }, [dispatch, productSlug, successReview]);

  return (
    <Spin
      spinning={
        loadingDetails === true ||
        loadingReview === true ||
        loadingRelated === true
      }
      indicator={antIcon}
    >
      <div className="container-fluid">
        <Meta title={`Product: ${productSlug}`} />
        <div className="row pt-4">
          <ProductDetails product={product} />
        </div>
        <div className="products-container mt-3">
          <div className="row">
            <div className="col pt-5 pb-5 text-center">
              <h3>Related Products</h3>
              <div className="underline"></div>
            </div>
          </div>
          <div className="container">
            <div className="row pb-5">
              {relatedProduct.length ? (
                relatedProduct.map((p) => (
                  <div key={p._id} className="col-md-4">
                    <UserProductCard product={p} />
                  </div>
                ))
              ) : (
                <div className="text-center col">
                  <p>No Products Found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ProductScreen;
