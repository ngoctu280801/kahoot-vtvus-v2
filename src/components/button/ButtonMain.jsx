/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

function ButtonMain({
  children,
  textColor = "text-white",
  bgColor,
  hoverColor,
  className = "",
  onClick = () => {},
  ...props
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      className={`${bgColor ?? "bg-blue-700"} normal-case font-semibold hover:${
        hoverColor ?? "bg-blue-800"
      } ${className}`}
      {...props}
    >
      <div className={`${textColor} flex items-center`}>{children}</div>
    </Button>
  );
}
ButtonMain.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  props: PropTypes.any,
};

export default ButtonMain;
