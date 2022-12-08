import React from "react";
import PropTypes from "prop-types";
import HeaderAuth from "./HeaderAuth";

function LayoutAuth({ children }) {
  return (
    <>
      <HeaderAuth />
      <div className="bg-gray-200 h-screen mx-auto pt-[58px]">{children}</div>
    </>
  );
}
LayoutAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutAuth;
