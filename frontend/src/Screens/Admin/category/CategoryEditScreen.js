import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategory,
  listCategoryDetails,
} from "../../../Actions/categoryAction";
import { LoadingOutlined } from "@ant-design/icons";
import {
  CATEGORY_UPDATE_RESET,
  CATEGORY_DETAILS_RESET,
} from "../../../Constants/categoryConstant";
import CategoryForm from "../../../Components/forms/CategoryForm";
import { Spin } from "antd";
import Meta from "../../../Components/Meta";

const CategoryEditScreen = ({ history, match }) => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

  const categorySlug = match.params.slug;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { loading: loadingUpdate, success: successUpdate } = categoryUpdate;

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading: loadingDetails, category } = categoryDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory(name, categorySlug));
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      dispatch({ type: CATEGORY_DETAILS_RESET });
      history.push("/admin/category");
    } else {
      if (!category.name || category.slug !== categorySlug) {
        dispatch(listCategoryDetails(categorySlug));
      } else {
        setName(category.name);
      }
    }
  }, [dispatch, successUpdate, history, categorySlug, category]);

  return (
    <Spin
      spinning={loadingDetails === true || loadingUpdate === true}
      indicator={antIcon}
    >
      <div className="container-fluid">
        <Meta title="Electroo: Edit Category" />
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-8 offset-md-1">
            <h3
              style={{ textAlign: "center", marginTop: 60, color: "#001529" }}
            >
              Edit Category
            </h3>
            <div className="underline"></div>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              loading={loadingUpdate}
              type="update"
            />
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default CategoryEditScreen;
