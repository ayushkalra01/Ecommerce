import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { Link } from "react-router-dom";
import Meta from "../../../Components/Meta";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import {
  createSubCategory,
  listSubCategories,
  deleteSubCategory,
} from "../../../Actions/subCategoryAction";
import { listCategories } from "../../../Actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { SUBCATEGORY_CREATE_RESET } from "../../../Constants/subCategoryConstant";
import CategoryForm from "../../../Components/forms/CategoryForm";
import LocalSearch from "../../../Components/LocalSearch";

const SubCategoryCreateScreen = () => {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const subCategoryCreate = useSelector((state) => state.subCategoryCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    category: createdSubCategory,
  } = subCategoryCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { loading: loadingSubCategoriesList, subCategories } = subCategoryList;

  const subCategoryDelete = useSelector((state) => state.subCategoryDelete);
  const { success: successDelete } = subCategoryDelete;

  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubCategory(name, category));
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SUBCATEGORY_CREATE_RESET });
      setName("");
    }
    dispatch(listSubCategories());
  }, [dispatch, successCreate, successDelete, createdSubCategory]);

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteSubCategory(slug));
    }
  };

  return (
    <Spin indicator={antIcon} spinning={loadingSubCategoriesList === true}>
      <div className="container-fluid">
        <Meta title="Electroo: Create Sub Category" />
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-8 offset-md-1">
            <h3
              style={{ textAlign: "center", marginTop: 60, color: "#001529" }}
            >
              Create Sub Category
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
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              loading={loadingCreate}
              type="create"
            />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {subCategories
              .filter((c) => c.name.toLowerCase().includes(keyword))
              .map((category) => {
                return (
                  <div key={category._id} className="alert alert-secondary">
                    {category.name}
                    <span className="btn btn-sm float-right">
                      <DeleteOutlined
                        onClick={() => handleDelete(category.slug)}
                        className="text-danger"
                      />
                    </span>
                    <Link to={`/admin/subcategory/${category.slug}`}>
                      <span className="btn btn-sm float-right">
                        <EditOutlined className="text-primary" />
                      </span>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default SubCategoryCreateScreen;
