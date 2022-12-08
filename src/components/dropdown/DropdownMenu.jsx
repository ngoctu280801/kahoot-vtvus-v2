/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import useClickOutside from "../../hooks/useClickOutSide";

// eslint-disable-next-line no-unused-vars
function Dropdown({ data, children, className = "" }) {
  const { show, setShow, nodeRef } = useClickOutside();
  return (
    <div className="relative" ref={nodeRef}>
      <div className="cursor-pointer w-fit" onClick={() => setShow(!show)}>
        {children}
      </div>
      {show && (
        <div
          className={`p-3 rounded-lg absolute top-full w-[175px] z-10 bg-white right-[-15px] shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px] ${className} `}
        >
          {data.length > 0 &&
            data.map((item, index) => (
              <div
                key={index}
                className={`px-1 py-2 hover:bg-gray-200 cursor-pointer rounded-md text-black ${item.className} ${
                  item.disable && "opacity-50"
                }`}
                onClick={() => {
                  item.onClick();
                  setShow(false);
                  // e.stopPropagation();
                }}
              >
                {item.icon} <span className={`text-sm ${item?.textColor ? item.textColor : ""}`}>{item.title}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
Dropdown.propTypes = {
  data: PropTypes.array,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Dropdown;
