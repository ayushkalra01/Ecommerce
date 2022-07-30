import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  listCategories,
  deleteCategory,
} from "../../../Actions/categoryAction";
import { CATEGORY_CREATE_RESET } from "../../../Constants/categoryConstant";
import CategoryForm from "../../../Components/forms/CategoryForm";
import LocalSearch from "../../../Components/LocalSearch";
import { Spin } from "antd";
import Meta from "../../../Components/Meta";

const CategoryCreateScreen = () => {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");

  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    category: createdCategory,
  } = categoryCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingList, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success: successDelete } = categoryDelete;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(name));
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteCategory(slug));
    }
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET });
      setName("");
    }
    dispatch(listCategories());
  }, [dispatch, successCreate, successDelete, createdCategory]);

  //const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <Spin
      spinning={loadingList === true || loadingCreate === true}
      indicator={antIcon}
    >
      <div className="container-fluid">
        <Meta title="Electroo: Create Category" />
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-8 offset-md-1">
            <h3
              style={{ textAlign: "center", marginTop: 60, color: "#001529" }}
            >
              Create Category
            </h3>
            <div className="underline"></div>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              loading={loadingCreate}
              type="create"
            />

            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {categories
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
                    <Link to={`/admin/category/${category.slug}`}>
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

export default CategoryCreateScreen;
