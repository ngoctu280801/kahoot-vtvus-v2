/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSlide } from "../../contexts/slideContext";
import { getQuestionById } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";
import BarChartPre from "../../components/chart/BarChartPre";
import FooterSlide from "./FooterSlide";
import HeaderSlide from "./HeaderSlide";

const getData = async (id, accessToken) => {
  const data = await getQuestionById(id, accessToken);
  return data;
};
function SlideUI() {
  // const dataChart = [
  //   {
  //     name: "Real Madrid",
  //     quantity: 5,
  //   },
  //   {
  //     name: "Chelsea",
  //     quantity: 7,
  //   },
  //   {
  //     name: "Bayern Munich",
  //     quantity: 4,
  //   },
  // ];
  const data = useSlide();
  const dataChart = data.answers?.map(item => {
    return { name: item.raw_answer, quantity: 2 };
  });

  return (
    <div className="p-4 bg-white m-10 flex-1 flex-flex-col relative max-h-[748px] overflow-auto">
      <HeaderSlide meta={data?.meta} question={data?.question} />
      {dataChart.length > 0 ? <BarChartPre data={dataChart} /> : <NoneBarChart />}
      <FooterSlide />
    </div>
  );
}

function NoneBarChart() {
  return (
    <div className="h-[395px] flex items-center justify-center flex-col">
      <img src="/barchartV2.png" className="w-[200px]" alt="" />
      <div className="text-gray-500 font-bold text-xl">Please add options</div>
    </div>
  );
}

export default SlideUI;
