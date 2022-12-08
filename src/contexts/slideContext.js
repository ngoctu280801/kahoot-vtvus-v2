/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllAnswersByIdQuestion, getQuestionById, updateQuestion } from "../handleApi";
import { getCurrentUser } from "../utils/constants";

const getData = async (id, accessToken) => {
  const data = await getQuestionById(id, accessToken);
  return data;
};
const SlideContext = createContext();
function SlideProvider(props) {
  const { idQuestion } = useParams();
  const user = getCurrentUser();

  const [meta, setMeta] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(idQuestion, user?.access_token);
      setIndex(res.index);
      setMeta(res.meta);
      setQuestion(res.raw_question);
      setDescription(res.long_description);
      const resAnswers = await getAllAnswersByIdQuestion(idQuestion, user?.access_token);
      setAnswers(resAnswers.sort());
    };
    fetchData();
  }, [idQuestion]);

  useEffect(() => {
    const questionData = {
      question_id: idQuestion,
      raw_question: question,
      meta,
      index,
      long_description: description,
    };
    updateQuestion(user?.access_token, questionData);
  }, [meta, question, description]);
  console.log("context", meta, question, description);

  const value = { meta, setMeta, question, setQuestion, description, setDescription, answers, setAnswers };
  return <SlideContext.Provider value={value} {...props} />;
}

function useSlide() {
  const context = useContext(SlideContext);
  if (typeof context === "undefined") throw new Error("useSlide must be used within a SlideProvider");
  return context;
}
export { SlideProvider, useSlide };
