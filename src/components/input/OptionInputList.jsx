/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import OptionInput from "./OptionInput";

function OptionInputList({ data, setList = () => {} }) {
  return (
    <div className="flex flex-col gap-2">
      {data.length > 0 && data.map(item => <OptionInput key={item.id} data={item} setList={setList} />)}
    </div>
  );
}
OptionInputList.propTypes = {
  data: PropTypes.array.isRequired,
  setList: PropTypes.func.isRequired,
};

export default OptionInputList;
