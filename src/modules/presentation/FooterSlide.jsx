/* eslint-disable react/require-default-props */
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";

function FooterSlide({ quantity = 0 }) {
  return (
    <div className="absolute bottom-8 right-4">
      <div className=" relative flex-1 flex justify-end items-start mt-8">
        <AccountCircleIcon className="text-gray-500 absolute" />
        <span className=" text-[10px] w-2 h-2 flex items-center justify-center bg-gray-100 rounded-full absolute top-1 ">
          {quantity}
        </span>
      </div>
    </div>
  );
}
FooterSlide.propTypes = {
  quantity: PropTypes.number,
};

export default FooterSlide;
