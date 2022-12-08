/* eslint-disable camelcase */
/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import User from "./User";

function Account({ username = "", avatar_url = "", isCurrent = false, type = "", className = "bg-green-600" }) {
  return (
    <div className="flex gap-2 items-center">
      <User className={`${className}`} avatar_url={avatar_url} />
      <span className={isCurrent ? "font-bold" : ""}>{username}</span>
      <span className="text-sm bg-gray-100 text-gray-700 px-2 py-2/4 rounded-sm">{type}</span>
    </div>
  );
}
Account.propTypes = {
  username: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  avatar_url: PropTypes.string,
  isCurrent: PropTypes.bool,
};

export default Account;
