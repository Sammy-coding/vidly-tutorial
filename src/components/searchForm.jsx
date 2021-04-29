import React from "react";

const SearchBox = ({value, onChange}) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      name="query"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      className="form-control"
    />
  );
};

export default SearchBox;
