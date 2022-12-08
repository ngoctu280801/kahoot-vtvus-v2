/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import HeaderMain from "./HeaderMain";

function LayoutMain({ children, bgColor, className = "" }) {
  return (
    <>
      <HeaderMain />
      <div className={`${bgColor || "bg-gray-100"} h-screen mx-auto pt-[58px] ${className}`}>{children}</div>
    </>
  );
}
LayoutMain.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
};

export default LayoutMain;
