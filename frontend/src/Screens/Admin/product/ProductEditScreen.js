import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import {
  listProductsDetails,
  updateProduct,
} from "../../../Actions/productAction";
import ProductUpdateForm from "../../../Components/forms/ProductUpdateForm";
import { listCategories } from "../../../Actions/categoryAction";
import { listSubCategories } from "../../../Actions/subCategoryAction";
import { listBrands } from "../../../Actions/brandAction";
import FileUpload from "../../../Components/FileUpload";

import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../../Constants/productConstant";
import Meta from "../../../Components/Meta";

const intialState = {
  title: "",
  description: "",
  price: "",
  category: {},
  subCategory: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Red", "Green", "Blue", "Black", "Brown", "Silver", "White", "Grey"],
  color: "",
  brand: {},
};

const ProductEditScreen = ({ match, history }) => {
  const [values, setValues] = useState(intialState);
  const [subIds, setSubIds] = useState([]);

  const productSlug = match.params.slug;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubCategories());
    dispatch(listBrands());
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push("/admin/products");
    } else if (!product.title || product.slug !== productSlug) {
      dispatch(listProductsDetails(productSlug));
    } else {
      setValues({ ...values, ...product });
      let arr = [];
      product.subCategory.map((s) => arr.push(s._id));
      setSubIds((prev) => arr);
    }
    // eslint-disable-next-line
  }, [dispatch, product, productSlug, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    values.category = values.category._id;
    values.subCategory = subIds;
    values.brand = values.brand._id;
    dispatch(updateProduct(productSlug, values));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setValues({
      ...values,
      category: { _id: e.target.value },
      subCategory: [],
    });
    if (e.target.value === product.category._id) {
      let arr = [];
      product.subCategory.map((s) => arr.push(s._id));
      setSubIds((prev) => arr);
    } else setSubIds([]);
  };

  const handleBrandChange = (e) => {
    setValues({
      ...values,
      brand: { _id: e.target.value },
    });
  };

  return (
    <div className="container-fluid">
      <Meta title="Electroo: Edit Products" />
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 offset-md-1">
          <h3 style={{ textAlign: "center", marginTop: 60, color: "#001529" }}>
            Edit Product
          </h3>
          <div className="underline"></div>
          <div className="p-3">
            <FileUpload values={values} setValues={setValues} />
          </div>
          <ProductUpdateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCategoryChange={handleCategoryChange}
            handleBrandChange={handleBrandChange}
            categories={categories}
            subCategories={subCategories}
            brands={brands}
            values={values}
            setValues={setValues}
            subIds={subIds}
            setSubIds={setSubIds}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductEditScreen;
