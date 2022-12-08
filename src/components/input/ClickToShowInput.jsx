/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "./Input";

function ClickToShowInput({ title = "", children }) {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <>
      {showDescription ? (
        children
      ) : (
        <div className="text-blue-500 cursor-pointer text-sm" onClick={() => setShowDescription(true)}>
          {title}
        </div>
      )}
    </>
  );
}
ClickToShowInput.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ClickToShowInput;
