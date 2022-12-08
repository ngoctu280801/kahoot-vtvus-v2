/* eslint-disable import/order */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import * as React from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import Input from "../input/Input";
import ModalMain from "./ModalMain";

export default function ModalCreateGroup({ open, handleClose, handleAgree, title = "Create group" }) {
  const [textFieldValue, setTextFieldValue] = React.useState("");
  const handleOnChange = text => {
    setTextFieldValue(text);
  };
  const buttonList = [
    {
      id: uuid(),
      title: "Cancle",
      onClick: handleClose,
      className: "font-bold px-8 normal-case",
      bgColor: "bg-gray-100",
      hoverColor: "bg-gray-200",
      textColor: "text-gray-800",
    },
    {
      id: uuid(),
      title: "Agree",
      onClick: () => {
        handleAgree(textFieldValue);
        handleClose();
      },
      className: "font-bold px-8 normal-case",
      bgColor: "bg-green-700",
      hoverColor: "bg-green-800",
      textColor: "text-white",
    },
  ];
  return (
    <ModalMain open={open} handleClose={handleClose} title={title} buttonList={buttonList}>
      <Input name="name" label="Name" onChange={handleOnChange} />
    </ModalMain>
  );
}
ModalCreateGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAgree: PropTypes.func,
  title: PropTypes.string,
};
