/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import InviteLinkInput from "../input/InviteLinkInput";
import ModalMain from "./ModalMain";

export default function ModalInvite({ handleClose = () => {}, idGroup = "", open = false }) {
  const buttonList = [
    {
      id: uuid(),
      title: "Close",
      className: "font-semibold mx-auto",
      bgColor: "bg-gray-100",
      hoverColor: "bg-gray-200",
      textColor: "text-gray-800",
      onClick: handleClose,
    },
  ];
  return (
    <ModalMain
      open={open}
      onClick={e => {
        e.stopPropagation();
      }}
      handleClose={handleClose}
      title="Invite link"
      buttonList={buttonList}
    >
      <InviteLinkInput idGroup={idGroup}></InviteLinkInput>
    </ModalMain>
  );
}
ModalInvite.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  idGroup: PropTypes.string,
};
