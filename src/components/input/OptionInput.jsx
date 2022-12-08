/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import { deleteAnswer, getAllAnswersByIdQuestion, getAnswerById, getSlideById, updateAnswer } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";
import { useSlide } from "../../contexts/slideContext";

function OptionInput({ data, setList = () => {} }) {
  const [slide, setSlide] = useState({});
  const [filter, setFilter] = useState(data.raw_answer);
  const user = getCurrentUser();
  const { idSlide, idQuestion } = useParams();
  const slideContext = useSlide();
  useEffect(() => {
    getSlideById(idSlide, user?.access_token).then(res => setSlide(res));
  }, []);
  const handleDeleteAnswer = async () => {
    const dataAnswer = {
      slide_id: idSlide,
      title: slide?.raw_question,
      content: slide?.long_description,
    };
    await deleteAnswer(data?.id, dataAnswer, user?.access_token);
    await getAllAnswersByIdQuestion(idQuestion, user?.access_token).then(res => {
      setList(res);
      slideContext.setAnswers(res);
    });
  };
  const handleChangeAnswer = async value => {
    const currentAnswer = await getAnswerById(data.id, user?.access_token);

    const updateData = {
      answer_id: data.id,
      index: currentAnswer.index,
      raw_answer: value,
    };
    await updateAnswer(user?.access_token, updateData);
    setFilter(value);
    await getAllAnswersByIdQuestion(idQuestion, user?.access_token).then(res => {
      console.log("res", res);
      setList(res);
      slideContext.setAnswers(res);
    });
  };
  return (
    <div className="flex gap-4 items-center">
      <input
        type="text"
        className="w-full border border-gray-200 rounded-sm p-2 outline-blue-400"
        value={filter}
        onChange={e => handleChangeAnswer(e.target.value)}
      />
      <CloseIcon
        onClick={e => handleDeleteAnswer(e)}
        className="cursor-pointer text-gray-500 hover:text-gray-700 text-md  "
      />
    </div>
  );
}

OptionInput.propTypes = {
  setList: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default OptionInput;
