/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import User from "../../components/user/User";
import Icon from "../../components/icon/Icon";
import DropdownMenu from "../../components/dropdown/DropdownMenu";
import ModalInvite from "../../components/modal/ModalInvite";
import useToggleModal from "../../hooks/useToggleModal";

function GroupItem({ to = "", groupName = "MUN", id = "" }) {
  const navigate = useNavigate();
  const { open, handleClickOpen, handleClose } = useToggleModal();
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
        handleClickOpen();
      },
    },
    {
      icon: <DeleteOutlinedIcon />,
      title: "Delete",
      onClick: () => {},
    },
  ];
  return (
    <div
      onClick={() => navigate(to)}
      className="group-item flex flex-col gap-2 bg-white h-40 p-4 shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px] rounded-md cursor-pointer"
    >
      <div className="flex justify-between">
        <div>
          {/* <User className="bg-gray-400" /> */}
          <User className="bg-gray-400" />
        </div>
        <Icon onClick={e => e.stopPropagation()} className="hidden option-list-item relative">
          <DropdownMenu data={optionGroupMenu}>
            <MoreVertOutlinedIcon />
          </DropdownMenu>
        </Icon>
      </div>
      <div className="text-sm group-desc">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing
        elit
      </div>
      <div className="flex-1 flex items-end font-semibold text-gray-800">{groupName}</div>
      <ModalInvite
        open={open}
        onClick={e => e.stopPropagation()}
        idGroup={id}
        handleClose={e => {
          e.stopPropagation();
          handleClose();
        }}
      />
    </div>
  );
}
GroupItem.propTypes = {
  to: PropTypes.string,
  groupName: PropTypes.string,
  id: PropTypes.string,
};

export default GroupItem;
