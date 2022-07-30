import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import CategoryForm from "../../../Components/forms/CategoryForm";
import {
  BRAND_DETAILS_RESET,
  BRAND_UPDATE_RESET,
} from "../../../Constants/brandConstant";
import { listBrandDetails, updateBrand } from "../../../Actions/brandAction";
import { listCategories } from "../../../Actions/categoryAction";
import Meta from "../../../Components/Meta";

const BrandEditScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const brandSlug = match.params.slug;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const brandUpdate = useSelector((state) => state.brandUpdate);
  const { loading: loadingUpdate, success: successUpdate } = brandUpdate;

  const brandDetails = useSelector((state) => state.brandDetails);
  const { loading: loadingDetails, brand } = brandDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBrand(name, brandSlug, category));
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BRAND_UPDATE_RESET });
      dispatch({ type: BRAND_DETAILS_RESET });
      history.push("/admin/brand");
    } else {
      if (!brand.name || !brand.category || brand.slug !== brandSlug) {
        dispatch(listBrandDetails(brandSlug));
      } else {
        setName(brand.name);
        setCategory(brand.category);
      }
    }
  }, [dispatch, successUpdate, history, brandSlug, brand]);

  return (
    <div className="container-fluid">
      <Meta title="Electroo: Edit Brand" />
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 offset-md-1">
          <h3 style={{ textAlign: "center", marginTop: 60, color: "#001529" }}>
            Edit Brand
          </h3>
          <div className="underline"></div>
          <div className="form-group">
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select a category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option
                    key={c._id}
                    value={c._id}
                    selected={c._id === category}
                  >
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            loading={loadingUpdate}
            type="update"
          />
          {loadingDetails && <h1 className="text-danger">Loading .....</h1>}
        </div>
      </div>
    </div>
  );
};

export default BrandEditScreen;
