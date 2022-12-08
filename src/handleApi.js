/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
/* eslint-disable camelcase */
import axios from "axios";
import { toast } from "react-toastify";

/* eslint-disable import/prefer-default-export */
export const getSlideById = async (id, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/slide/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const updateSlide = async (slide, filter, accessToken, setSlide) => {
  const newSlide = { slide_id: slide?.id, content: slide?.content, title: filter };
  try {
    await axios.put(`${process.env.REACT_APP_BE_ADDRESS}/slide`, newSlide, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    setSlide({ ...slide, title: filter });
    toast.success("Updated successfully");
  } catch (error) {
    console.log(error);
    toast.error("Error updating");
  }
  return null;
};

export const updateSlideById = async (slideId, title, content, accessToken) => {
  try {
    const data = {
      slide_id: slideId,
      title,
      content,
    };
    const res = await axios.put(`${process.env.REACT_APP_BE_ADDRESS}/slide`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
  } catch (error) {
    console.log(error);
    toast.error("Error updating");
  }
  return null;
};

export const createSlide = async (title, content, accessToken) => {
  try {
    const data = {
      title,
      content,
    };
    const res = await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/slide`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const getAlllides = async accessToken => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/slide`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getAllQuestionByIdSlide = async (idSlide, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/question/slide/${idSlide}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // res.data.forEach((element, index) => {
    //   element.index = index + 1;
    // });
    // console.log("all question", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

// question

export const createQuestion = async (
  slide_id,
  accessToken,
  raw_question = "Multiple Choice",
  meta = "",
  long_description = ""
) => {
  const questions = await getAllQuestionByIdSlide(slide_id, accessToken);
  let index = 1;
  if (questions.length > 0) {
    index = questions[questions.length - 1].index + 1 || 1;
  }
  try {
    const data = {
      slide_id,
      index,
      raw_question,
      meta,
      long_description,
    };
    const res = await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/question`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const deleteQuestion = async (id, data, accessToken) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_BE_ADDRESS}/question/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
      data
    );
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getQuestionById = async (id, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/question/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const updateQuestion = async (accessToken, data) => {
  try {
    await axios.put(`${process.env.REACT_APP_BE_ADDRESS}/question`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
  return null;
};

// answer
export const getAllAnswersByIdQuestion = async (idQuestion, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/answer/question/${idQuestion}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getAnswerById = async (idAnswer, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/answer/${idAnswer}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createAnswer = async (question_id, index, raw_answer, accessToken) => {
  try {
    const data = {
      question_id,
      index,
      raw_answer,
    };
    const res = await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/answer`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const deleteAnswer = async (id, data, accessToken) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_BE_ADDRESS}/answer/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
      data
    );
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const updateAnswer = async (accessToken, data) => {
  try {
    await axios.put(`${process.env.REACT_APP_BE_ADDRESS}/answer`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("update successfull");
  } catch (error) {
    console.log(error);
  }
  return null;
};
