import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router";
import ButtonMain from "../components/button/ButtonMain";
import LayoutPresentation from "../components/layout/LayoutPresentation";
import SlideListMenu from "../modules/presentation/SlideListMenu";
import MenuPresentation from "../modules/presentation/MenuPresentation";
import SlideUI from "../modules/presentation/SlideUI";
import { SlideProvider } from "../contexts/slideContext";
import { createQuestion, getAllQuestionByIdSlide } from "../handleApi";
import { getCurrentUser } from "../utils/constants";

function PresentationPage() {
  const [questionList, setQuestionList] = useState({});
  const { idSlide } = useParams("idSlide");
  const navigate = useNavigate();
  const user = getCurrentUser();
  useEffect(() => {
    getAllQuestionByIdSlide(idSlide, user?.access_token).then(res => setQuestionList(res));
  }, []);

  const handleCreateQuestion = async () => {
    const question = await createQuestion(idSlide, user?.access_token);
    setQuestionList([...questionList, question.data]);
    navigate(`/presentation/${idSlide}/${question?.data?.id}/edit`);
  };

  return (
    <LayoutPresentation>
      <div className="h-[56px] flex items-center border-b px-4 border-gray-200 ">
        <ButtonMain
          bgColor="bg-blue-600"
          textColor="text-white"
          hoverColor="bg-blue-700"
          onClick={handleCreateQuestion}
        >
          <AddIcon className="w-5" />
          <span className="text-lg font-thin"> New slide</span>
        </ButtonMain>
      </div>
      <div className="flex w-full justify-between bg-gray-200">
        <SlideProvider>
          <SlideListMenu data={questionList} setList={setQuestionList} />
          <SlideUI />
          <MenuPresentation />
        </SlideProvider>
      </div>
    </LayoutPresentation>
  );
}

export default PresentationPage;
