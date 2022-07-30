import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <>
      <input
        type="search"
        className="form-control mb-4"
        placeholder="Search"
        value={keyword}
        onChange={handleSearch}
      />
    </>
  );
};

export default LocalSearch;
