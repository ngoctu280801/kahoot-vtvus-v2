import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ButtonMain from "../../components/button/ButtonMain";
import OptionInputList from "../../components/input/OptionInputList";
import { useSlide } from "../../contexts/slideContext";
import { createAnswer, getAllAnswersByIdQuestion } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";

function OptionSlide() {
  const { idQuestion } = useParams();
  const user = getCurrentUser();
  // eslint-disable-next-line no-unused-vars
  const [optionList, setOptionList] = useState([]);
  const { setAnswers } = useSlide();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAnswersByIdQuestion(idQuestion, user?.access_token);
      setOptionList(res);
    };
    fetchData();
  }, [idQuestion]);

  const handleCreateAnswer = async () => {
    const index = optionList.length + 1;
    const res = await createAnswer(idQuestion, index, `Option ${index}`, user.access_token);
    setOptionList([...optionList, res]);
    setAnswers([...optionList, res]);
  };

  return (
    <div>
      <h3 className="text-md font-semibold mb-2">
        Options <HelpOutlineIcon />
      </h3>
      <OptionInputList data={optionList} setList={setOptionList} />
      <ButtonMain
        onClick={handleCreateAnswer}
        className="w-full mt-2 text-md"
        bgColor="bg-gray-200 hover:!bg-gray-300"
        textColor="text-gray-800"
      >
        + Add option
      </ButtonMain>
    </div>
  );
}

export default OptionSlide;
