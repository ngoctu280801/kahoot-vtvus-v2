/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import { PropTypes } from "prop-types";
import React from "react";
import { useNavigate } from "react-router";
import uuid from "react-uuid";
import { deleteUserOnGroup, leaveGroup } from "../../redux/apiRequest";
import ModalMain from "./ModalMain";

function ModalDelete({ children, open, handleClose = () => {}, handleDelete = () => {}, isLeave = false }) {
  const buttonList = [
    {
      id: uuid(),
      title: "Close",
      className: "font-bold px-8 normal-case",
      bgColor: "bg-gray-100",
      hoverColor: "bg-gray-200",
      textColor: "text-gray-800",
      onClick: handleClose,
    },
    {
      id: uuid(),
      title: isLeave ? "Leave" : "Delete",
      className: "font-bold px-8 normal-case",
      bgColor: "bg-red-600",
      hoverColor: "!bg-red-600",
      textColor: "text-white",
      onClick: e => {
        e.stopPropagation();

        handleDelete();
        handleClose();
      },
    },
  ];
  return (
    <ModalMain className="w-[500px]" open={open} handleClose={handleClose} buttonList={buttonList}>
      <div className="text-gray-800 text-lg text-center mt-8">{children}</div>
      <div className="flex items-center justify-center mt-4 w-full">
        <img src="/trash.png" className="w-[100px] h-[100px]" alt="" />
      </div>
    </ModalMain>
  );
}
ModalDelete.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  isLeave: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  children: PropTypes.node,
};
export default ModalDelete;
