import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SEARCH_QUERY } from "../../Constants/searchConstant";

const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SEARCH_QUERY, payload: { text: keyword.trim() } });
    history.push("/shop");
  };

  return (
    <form className="form-inline my-0" onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control mr-sm-2"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search"
        style={{ color: "white" }}
      />
      {/* my-2 my-lg-0 */}
      <SearchOutlined
        className="form-control"
        onClick={handleSubmit}
        style={{ cursor: "pointer" }}
      />
    </form>
  );
};

export default SearchForm;
