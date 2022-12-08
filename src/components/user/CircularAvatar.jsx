/* eslint-disable react/prop-types */
import React from "react";

function CircularAvatar({ imgUrl, size = "12", props }) {
  return (
    <div className="">
      <img className={`rounded-full object-cover h-${size} w-${size} ${props ?? ""}`} src={imgUrl} alt="img" />
    </div>
  );
}

export default CircularAvatar;
