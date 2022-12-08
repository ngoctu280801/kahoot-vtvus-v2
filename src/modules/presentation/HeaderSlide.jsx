/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";

function HeaderSlide({ meta = "This is a meta field", question = "Who need Ronaldo" }) {
  return (
    <div className="mt-10">
      <p className="text-sm text-gray-400">{meta}</p>
      <div
        className={`w-[700px] flex flex-wrap text-3xl font-bold text-gray-800 ${question.length > 100 && "!text-xl"}`}
      >
        {question}
      </div>
    </div>
  );
}

HeaderSlide.propTypes = {
  meta: PropTypes.string,
  question: PropTypes.string,
};

export default HeaderSlide;
