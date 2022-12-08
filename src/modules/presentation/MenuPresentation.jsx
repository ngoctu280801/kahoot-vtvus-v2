/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSlide } from "../../contexts/slideContext";
import { getQuestionById } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";

import ContentSlideSetting from "./ContentSlideSetting";
import SlideMenuSettingHeader from "./SlideMenuSettingHeader";

const getData = async (id, accessToken) => {
  const data = await getQuestionById(id, accessToken);
  return data;
};
function MenuPresentation() {
  const data = useSlide();

  return (
    <div className="w-[460px] max-h-[600px] overflow-auto border-l border-gray-200 bg-white">
      <SlideMenuSettingHeader />
      <ContentSlideSetting data={data} />
    </div>
  );
}

export default MenuPresentation;
