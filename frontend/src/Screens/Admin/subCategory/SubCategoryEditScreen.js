import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import CategoryForm from "../../../Components/forms/CategoryForm";
import {
  SUBCATEGORY_DETAILS_RESET,
  SUBCATEGORY_UPDATE_RESET,
} from "../../../Constants/subCategoryConstant";
import {
  listSubCategoryDetails,
  updateSubCategory,
} from "../../../Actions/subCategoryAction";
import { listCategories } from "../../../Actions/categoryAction";
import Meta from "../../../Components/Meta";

const SubCategoryEditScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const subCategorySlug = match.params.slug;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCategoryUpdate = useSelector((state) => state.subCategoryUpdate);
  const { loading: loadingUpdate, success: successUpdate } = subCategoryUpdate;

  const subCategoryDetails = useSelector((state) => state.subCategoryDetails);
  const { loading: loadingDetails, subCategory } = subCategoryDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSubCategory(name, subCategorySlug, category));
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SUBCATEGORY_UPDATE_RESET });
      dispatch({ type: SUBCATEGORY_DETAILS_RESET });
      history.push("/admin/subcategory");
    } else {
      if (
        !subCategory.name ||
        !subCategory.category ||
        subCategory.slug !== subCategorySlug
      ) {
        dispatch(listSubCategoryDetails(subCategorySlug));
      } else {
        setName(subCategory.name);
        setCategory(subCategory.category);
      }
    }
  }, [dispatch, successUpdate, history, subCategorySlug, subCategory]);

  return (
    <div className="container-fluid">
      <Meta title="Electroo: Edit Sub Category" />
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 offset-md-1">
          <h3 style={{ textAlign: "center", marginTop: 60, color: "#001529" }}>
            Edit Sub Category
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

export default SubCategoryEditScreen;
