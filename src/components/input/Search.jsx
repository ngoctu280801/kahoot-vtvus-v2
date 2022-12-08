import React from "react";
import PropTypes from "prop-types";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Search({ handleSetFilter }) {
  return (
    <div className="w-full max-w-[235px] relative">
      <input
        onChange={handleSetFilter}
        type="text"
        className="w-full p-2 pl-10 outline-purple-400 rounded-sm border border-solid border-gray-300"
        placeholder="Search "
      />
      <SearchOutlinedIcon className="absolute top-2 left-2 text-gray-400" />
    </div>
  );
}
Search.propTypes = {
  handleSetFilter: PropTypes.func.isRequired,
};

export default Search;
