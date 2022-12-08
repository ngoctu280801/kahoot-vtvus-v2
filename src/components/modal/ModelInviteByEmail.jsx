/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable react/require-default-props */
import * as React from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Input from "../input/Input";
import ModalMain from "./ModalMain";
import { getCurrentUser, validateEmail } from "../../utils/constants";

const inviteViaEmail = async (groupId, email, accessToken) => {
  try {
    const data = {
      group_id: groupId,
      email: email,
    };
    const res = await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/group/invite`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default function ModalInviteByEmail({ groupId, open, handleClose }) {
  const [errorText, setErrorText] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const user = getCurrentUser();
  const handleAgree = async text => {
    setIsSending(true);
    if (validateEmail(text)) {
      const res = await inviteViaEmail(groupId, text, user.access_token);
      setErrorText(res.data.message);
    } else {
      setErrorText("Invalid email, please try again");
    }
    setIsSending(false);
  };
  const handleOnChange = text => {
    setEmail(text);
  };
  const buttonList = [
    {
      id: uuid(),
      title: "Cancle",
      onClick: () => {
        setErrorText("");
        handleClose();
      },
      className: "font-bold px-8 normal-case",
      bgColor: "bg-gray-100",
      hoverColor: "bg-gray-200",
      textColor: "text-gray-800",
    },
    {
      id: uuid(),
      title: "Agree",
      onClick: () => {
        handleAgree(email);
      },
      className: "font-bold px-8 normal-case",
      bgColor: "bg-green-700",
      hoverColor: "bg-green-800",
      textColor: "text-white",
    },
  ];
  return (
    <ModalMain open={open} handleClose={handleClose} title="Invite by email address" buttonList={buttonList}>
      <Input name="email" label="Email address" type="email" limit={100} onChange={handleOnChange} />
      {isSending ? (
        <div className="w-full text-center mt-4">
          <CircularProgress />
        </div>
      ) : (
        <h2 className="text-red-500 font-thin">{errorText}</h2>
      )}
    </ModalMain>
  );
}
ModalInviteByEmail.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
};
