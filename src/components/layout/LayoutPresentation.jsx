import React from "react";
import PropTypes from "prop-types";
import HeaderPresentation from "./HeaderPresentation";

function LayoutPresentation({ children }) {
  return (
    <>
      <HeaderPresentation />
      {children}
    </>
  );
}

LayoutPresentation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutPresentation;
