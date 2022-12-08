/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */

import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";
import { PlayCircleFilled } from "@mui/icons-material";
import { useEffect, React, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import axios from "axios";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Icon from "../../components/icon/Icon";
import DropdownMenu from "../../components/dropdown/DropdownMenu";
import useHover from "../../hooks/useHover";
import { createQuestion, getAllQuestionByIdSlide, updateSlideById } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";
import ModalDelete from "../../components/modal/ModalDelete";
import useToggleModal from "../../hooks/useToggleModal";
import ModalCreateGroup from "../../components/modal/ModelCreateGroup";

const deleteSlide = async (id, accessToken) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BE_ADDRESS}/slide/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

function SlideList({ onSelected = value => {}, listItem, setSlideList }) {
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const handleOnSelectAll = value => {
    setIsSelectedAll(value);
    onSelected(value);
  };
  const { open: openDelete, handleClickOpen: handleOpenDelete, handleClose: handleCloseDelete } = useToggleModal();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [selectedItem, setSelectedItem] = useState(null);
  const { open, handleClickOpen, handleClose } = useToggleModal();
  // const handleOnChecked = value => {
  //   if(value)
  // };
  const handleDelete = async id => {
    const res = await deleteSlide(id, user.access_token);
    const newList = listItem.filter(e => e.id !== id);
    setSlideList(newList);
    toast.success("Delete slide successfully");
  };
  const handleRenameSlide = async (oldItem, newTitle) => {
    const res = await updateSlideById(oldItem.id, newTitle, oldItem.content, user.access_token);
    const newItem = res.data;
    if (res === null) return;
    const index = listItem.findIndex(e => e.id === oldItem.id);
    const newList = listItem.filter(e => e.id !== oldItem.id);
    newList.splice(index, 0, newItem);
    setSlideList(newList);
  };
  return (
    <div className="mt-8">
      <ListHeader onSelectAll={handleOnSelectAll} />
      {listItem.length > 0 ? (
        listItem.map(item => (
          <ListItem
            key={item.id}
            title={item.title}
            // checked={!!isSelectedAll}
            idSlide={item.id}
            onShowSlide={() => {
              // show slide
            }}
            onDelete={() => {
              handleOpenDelete();
              setSelectedItem(item);
            }}
            onChecked={value => {
              if (value === true) {
                const newList = [...selectedList, item];
                setSelectedList(newList);
              }
            }}
            onRename={() => {
              handleClickOpen();
              setSelectedItem(item);
            }}
          />
        ))
      ) : (
        <div className="w-full flex">
          <h2 className="mx-auto mt-20 font-bold text-3xl text-gray-400">There is no slide here</h2>
        </div>
      )}
      <ModalCreateGroup
        handleClose={handleClose}
        open={open}
        handleAgree={value => {
          handleRenameSlide(selectedItem, value);
        }}
      />
      <ModalDelete
        open={openDelete}
        handleDelete={() => {
          handleDelete(selectedItem.id);
        }}
        handleClose={handleCloseDelete}
      >
        Are you sure to delete this slide
      </ModalDelete>
    </div>
  );
}
SlideList.propTypes = {
  onSelected: PropTypes.func,
  listItem: PropTypes.array,
  setSlideList: PropTypes.any,
};

function ListHeader({ onSelectAll = value => {} }) {
  const handleOnChange = e => {
    onSelectAll(e.target.checked);
  };
  return (
    <div className="flex items-center justify-start border-b-2 border-gray-300">
      <Checkbox onChange={handleOnChange} />
      <div className="font-bold flex-1">Name</div>
      <div className="font-bold w-[244px]">Owner</div>
      <div className="font-bold w-[244px]">Modified</div>
      <div className="font-bold w-[244px]">Created</div>
      <div className="w-10" />
    </div>
  );
}
ListHeader.propTypes = {
  onSelectAll: PropTypes.func,
};

function ListItem({ title, onShowSlide, idSlide, onDelete, onChecked, onRename }) {
  const optionGroupMenu = [
    {
      icon: <OpenInNewOutlinedIcon />,
      title: "Open",
      onClick: () => {},
    },
    {
      icon: <PersonAddAltOutlinedIcon />,
      title: "Invite members",
      onClick: e => {
        // handleClickOpen();
      },
    },
    {
      icon: <EditIcon />,
      title: "Rename",
      onClick: () => {
        onRename();
      },
    },
    {
      icon: <DeleteOutlinedIcon color="error" />,
      title: "Delete",
      textColor: "text-red-500",
      onClick: () => {
        onDelete();
      },
    },
  ];
  const [ref, hovered] = useHover();
  const [questionList, setQuestionList] = useState({});
  const navigate = useNavigate();
  const user = getCurrentUser();
  const createFirstQuestion = async (id, accessToken) => {
    await createQuestion(id, accessToken);
  };

  const getFirstQuestion = async (id, accessToken) => {
    try {
      const questions = await getAllQuestionByIdSlide(id, accessToken);
      const [first, ...rest] = questions;
      return first;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  const handleOnChecked = e => onChecked(e.target.checked);
  useEffect(() => {
    getAllQuestionByIdSlide(idSlide, user?.access_token).then(res => setQuestionList(res));
  }, []);
  return (
    <div className="w-full py-4 group-item flex items-center hover:bg-gray-200">
      <Checkbox onChange={handleOnChecked} />
      <div ref={ref}>
        <PlayButton
          onClick={onShowSlide}
          color={`${hovered ? "primary" : "action"}`}
          className="ml-4 mr-4 cursor-pointer"
        />
      </div>
      <div className="flex-1">
        <h2
          className="font-bold cursor-pointer hover:text-gray-500"
          onClick={async () => {
            if (questionList.length === 0) await createFirstQuestion(idSlide, user?.access_token);
            const first = await getFirstQuestion(idSlide, user?.access_token);
            navigate(`/presentation/${idSlide}/${first.id}/edit`);
          }}
        >
          {title}
        </h2>
        <h3 className="font-light text-sm text-gray-400">{questionList.length || 0} SLIDES</h3>
      </div>
      <div className="text-gray-400 w-[244px]">me</div>
      <div className="text-gray-400 w-[244px]">about 19 hours ago</div>
      <div className="text-gray-400 w-[244px]">about 19 hours ago</div>
      <Icon onClick={e => e.stopPropagation()}>
        <DropdownMenu data={optionGroupMenu}>
          <MoreHorizIcon className="mr-4" />
        </DropdownMenu>
      </Icon>
    </div>
  );
}
ListItem.propTypes = {
  title: PropTypes.string,
  onShowSlide: PropTypes.func,
  idSlide: PropTypes.string,
  onDelete: PropTypes.func,
  onChecked: PropTypes.func,
  onRename: PropTypes.func,
};

function PlayButton({ onClick, className, ...props }) {
  const { hoverRef, isHovered } = useHover();
  return (
    <PlayCircleFilled
      ref={hoverRef}
      color={`${isHovered ? "primary" : "disabled"}`}
      onClick={onClick}
      className={className}
      {...props}
    />
  );
}
PlayButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  props: PropTypes.any,
};

export default SlideList;
