/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";

function Icon({ children, onClick = () => {}, className = "", isActive = false }) {
  return (
    <div className={`${className} cursor-pointer ${isActive ? "text-purple-600" : "text-gray-500"}`} onClick={onClick}>
      {children}
    </div>
  );
}
Icon.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  isActive: PropTypes.bool,
};
export default Icon;
