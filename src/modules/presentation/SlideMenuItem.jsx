/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import Icon from "../../components/icon/Icon";
import DropdownMenu from "../../components/dropdown/DropdownMenu";
import ModalDelete from "../../components/modal/ModalDelete";
import useToggleModal from "../../hooks/useToggleModal";
import User from "../../components/user/User";
import { getCurrentUser } from "../../utils/constants";
import { deleteQuestion, getAllQuestionByIdSlide, getQuestionById } from "../../handleApi";

function SlideMenuItem({
  id,
  title = "Who's need asds adasda sdsda Ronaldo",
  isActive = false,
  onClick = () => {},
  index = 1,
  setList = () => {},
}) {
  const { open: openDelete, handleClickOpen: handleOpenDelete, handleClose: handleCloseDelete } = useToggleModal();
  const { idQuestion, idSlide } = useParams();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState([]);
  useEffect(() => {
    getAllQuestionByIdSlide(idSlide, user?.access_token).then(res => setQuestionList(res));
  }, [idQuestion]);
  const optionSlideMenu = [
    {
      icon: <DeleteOutlinedIcon />,
      title: questionList.length === 1 ? "Cant't delete" : "Delete",
      disable: questionList.length === 1,
      onClick: () => {
        if (questionList.length > 1) handleOpenDelete();
      },
    },
  ];
  const handleDelete = async () => {
    const res = await getQuestionById(idQuestion, user?.access_token);
    const data = {
      slide_id: res?.slide_id,
      title: res?.raw_question,
      content: res?.long_description,
    };
    await deleteQuestion(id, data, user?.access_token);
    const questions = await getAllQuestionByIdSlide(idSlide, user?.access_token);
    setList(questions);
    if (isActive) {
      if (questions.length === 1) {
        navigate(`/presentation/${idSlide}/${questions[0]?.id}/edit`);
      } else {
        const currentQuestion = questions[index - 1];
        if (currentQuestion) {
          navigate(`/presentation/${idSlide}/${currentQuestion?.id}/edit`);
        } else {
          const currentId = questions[questions.length - 1].id;
          navigate(`/presentation/${idSlide}/${currentId}/edit`);
        }
      }
    }
  };
  return (
    <div className={`flex  cursor-pointer ${isActive && "!bg-blue-100"} slide-menu-item`} onClick={onClick}>
      <div className="flex flex-col items-center justify-between m-2 relative">
        <div className="text-center">
          {isActive && <div className="absolute w-1 top-2 bottom-2 bg-blue-500 -left-2" />}
          <div>{index}</div>
          <Tooltip title="This is the slide current seen in voting. Click to present from here" placement="right">
            <PlayArrowIcon
              onClick={e => {
                e.stopPropagation();
              }}
              className="text-blue-500"
            />
          </Tooltip>
        </div>
        <Icon
          onClick={e => e.stopPropagation()}
          className="hidden relative ic-slide-menu-item hover:bg-gray-100 rounded-full"
        >
          <DropdownMenu className="!p-0 !-right-[175px]" data={optionSlideMenu}>
            <DragIndicatorIcon className="text-gray-300 text-md font-thin " />
          </DropdownMenu>
        </Icon>
      </div>
      <div className="w-[174px] h-[98px] hover:opacity-60 bg-white m-2 border border-gray-400 rounded-sm flex flex-col gap-2 items-center justify-center relative">
        <img className="w-8 h-8" src="/barchart.png" alt="" />
        <div className="text-[12px] font-semibold h-[18px] mx-2 title-slide-menu">{title}</div>
        {isActive && <User avatar_url={user?.user?.avatar_url} className="absolute bottom-0 left-2 !w-5 !h-5" />}
      </div>
      <ModalDelete open={openDelete} handleDelete={handleDelete} handleClose={handleCloseDelete}>
        Are you sure to delete this slide
      </ModalDelete>
    </div>
  );
}
SlideMenuItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  index: PropTypes.number,
  setList: PropTypes.func,
};

export default SlideMenuItem;
