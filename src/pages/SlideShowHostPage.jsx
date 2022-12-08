/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import PropTypes from "prop-types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState, useEffect } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Navigate, useNavigate, useParams } from "react-router";
import HeaderSlide from "../modules/presentation/HeaderSlide";
import BarChartPre from "../components/chart/BarChartPre";
import FooterSlide from "../modules/presentation/FooterSlide";
import { getAllAnswersByIdQuestion, getAllQuestionByIdSlide } from "../handleApi";
import { getCurrentUser } from "../utils/constants";

const getData = async (id, accessToken) => {
  const data = await getAllQuestionByIdSlide(id, accessToken);
  return data;
};

function SlideShowHostPage({ slide = "Slide" }) {
  const { id } = useParams();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const handleOnClickNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };
  const handleOnClickPre = () => {
    setCurrentQuestion(currentQuestion - 1);
  };
  const handleOnBack = () => {
    navigate(`/presentation/${id}/${questions[0].id}/edit`);
  };
  useEffect(() => {
    getData(id, user.access_token).then(res => {
      setQuestions(res);
    });
  }, [id]);
  return (
    <div className="bg-black w-full h-screen flex relative">
      <div
        className="my-auto ml-4 p-2 rounded-full cursor-pointer hover:bg-gray-700 items-center"
        onClick={currentQuestion > 0 ? handleOnClickPre : null}
      >
        <ArrowBackIosIcon sx={{ color: "white" }} />
      </div>
      <div className="m-auto w-[90%] h-[80%] bg-white flex">
        <div className="w-full h-full">
          <SlideUI question={questions[currentQuestion]} />
        </div>
      </div>
      <div
        className="my-auto mr-4 p-2 rounded-full cursor-pointer hover:bg-gray-700 items-center"
        onClick={currentQuestion < questions.length - 1 ? handleOnClickNext : null}
      >
        <ArrowForwardIosIcon sx={{ color: "white" }} />
      </div>
      <div
        className="absolute top-4 left-4 p-2 rounded-full cursor-pointer hover:bg-gray-700 items-center"
        onClick={handleOnBack}
      >
        <ArrowBackIcon sx={{ color: "white" }} />
      </div>
      <div className="absolute text-center bottom-8 left-0 right-0 text-white">
        {questions?.length > 0 &&
          questions.map((e, index) => (
            <FiberManualRecordIcon sx={{ color: `${currentQuestion === index ? "white" : "gray"}` }} />
          ))}
      </div>
    </div>
  );
}
SlideShowHostPage.propTypes = {
  slide: PropTypes.any,
};

function SlideUI({ question }) {
  const user = getCurrentUser();
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    getAllAnswersByIdQuestion(question?.id, user.access_token).then(res => {
      const newDataChart = res?.map(item => {
        return { name: item.raw_answer, quantity: 2 };
      });
      setDataChart(newDataChart);
    });
  });
  //   const dataChart = [
  //     {
  //       name: "Real Madrid",
  //       quantity: 5,
  //     },
  //     {
  //       name: "Chelsea",
  //       quantity: 7,
  //     },
  //     {
  //       name: "Bayern Munich",
  //       quantity: 4,
  //     },
  //   ];
  //   const dataChart = data.answers?.map(item => {
  //     return { name: item.raw_answer, quantity: 2 };
  //   });

  return (
    <div className="p-4 bg-white m-10 flex-1 flex-flex-col relative max-h-[748px] overflow-auto">
      <HeaderSlide meta={question?.meta} question={question?.raw_question} />
      {dataChart.length > 0 ? <BarChartPre data={dataChart} /> : <NoneBarChart />}
      <FooterSlide />
    </div>
  );
}
SlideUI.propTypes = {
  question: PropTypes.object,
};

function NoneBarChart() {
  return (
    <div className="h-[395px] flex items-center justify-center flex-col">
      <img src="/barchartV2.png" className="w-[200px]" alt="" />
      <div className="text-gray-500 font-bold text-xl">Please add options</div>
    </div>
  );
}
export default SlideShowHostPage;
