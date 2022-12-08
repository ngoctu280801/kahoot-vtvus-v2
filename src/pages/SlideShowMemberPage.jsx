/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ButtonMain from "../components/button/ButtonMain";
import RadioItem from "../components/radio/RadioItem";

function SlideShowMemberPage({
  meta = "This is a meta description",
  question = "Who need Ronaldo",
  description = "This is long description",
}) {
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(value);
  };
  return (
    <div className="mx-auto  flex flex-col items-center max-w-[600px] m-10 p-2">
      <div className="max-w-[200px] mb-10">
        <img src="/logo.svg" className="w-full" alt="logo" />
      </div>
      <div className="flex flex-col items-start w-full gap-2">
        <p className="text-gray-400">{meta}</p>
        <h2 className="text-3xl font-bold">{question}</h2>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className="w-full mt-4">
        <RadioGroup
          className="flex flex-col gap-4"
          name="answer"
          onChange={handleChange}
          value={value}
          defaultValue="first"
        >
          <RadioItem value="first" label="Lionel Messi" control={<Radio />} />
          <RadioItem value="second" label="Bruno Fernandes" control={<Radio />} />
          <RadioItem value="third" label="Mason Greenwood" control={<Radio />} />
        </RadioGroup>

        <ButtonMain
          className="w-full mt-4 text-lg py-3"
          bgColor="bg-blue-500 hover:!bg-blue-600"
          textColor="text-white-800"
          onClick={handleSubmit}
        >
          Submit
        </ButtonMain>
      </div>
    </div>
  );
}
SlideShowMemberPage.propTypes = {
  meta: PropTypes.string,
  question: PropTypes.string,
  description: PropTypes.string,
};

export default SlideShowMemberPage;
