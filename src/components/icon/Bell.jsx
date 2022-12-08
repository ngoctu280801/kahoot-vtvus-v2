/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { PropTypes } from "prop-types";

// eslint-disable-next-line react/function-component-definition
const Bell = ({ onClick }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <NotificationsActiveIcon />
    </div>
  );
};
Bell.propTypes = {
  // eslint-disable-next-line react/require-default-props
  onClick: PropTypes.func,
};

export default Bell;
