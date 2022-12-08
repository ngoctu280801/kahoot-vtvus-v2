/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import * as React from "react";
import uuid from "react-uuid";
import PropTypes from "prop-types";
import User from "../user/User";
import ModalMain from "./ModalMain";

export default function ModalUserInfo({ data, member, open, handleClose = () => {} }) {
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
    <ModalMain open={open} handleClose={handleClose} title="Member info" buttonList={buttonList}>
      <div className="flex flex-col gap-4">
        <User className="bg-green-600 w-fit" />
        <table>
          <thead>
            <th className="w-[60px]"> </th>
            <th> </th>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Name: </b>
              </td>
              <td>{member?.user?.name}</td>
            </tr>
            <tr>
              <td>
                <b>Email:</b>
              </td>
              <td>{member?.user?.email}</td>
            </tr>
            <tr>
              <td>
                <b>Role:</b>
              </td>
              <td>{data?.role}</td>
            </tr>
            <tr>
              <td>
                <b>Status:</b>
              </td>
              <td>{data?.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ModalMain>
  );
}
ModalUserInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  member: PropTypes.object,
};
