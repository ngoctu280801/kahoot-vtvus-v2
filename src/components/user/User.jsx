/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { PropTypes } from "prop-types";

function User({ className, onClick = () => {}, avatar_url = "" }) {
  return (
    <div
      className={`${className} w-8 h-8 user-header flex items-center justify-center rounded-full cursor-pointer`}
      onClick={onClick}
    >
      {avatar_url ? (
        <img className="object-cover w-full h-full rounded-full" src={avatar_url} />
      ) : (
        <PersonIcon className="w-6 h-6" />
      )}
    </div>
  );
}
User.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  avatar_url: PropTypes.string,
};
export default User;
