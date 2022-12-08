/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useToggleModal from "../../hooks/useToggleModal";
import { getCurrentUser } from "../../utils/constants";
import ModalCreateGroup from "../modal/ModelCreateGroup";

function RecentGroup() {
  const { open, handleClickOpen, handleClose } = useToggleModal();
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="py-4 px-2">
      <h3 className="font-bold px-2">Recent groups</h3>
      <div
        className={`cursor-pointer hover:bg-gray-200 rounded-md px-2 py-1 ${
          id === "MUN" && "bg-slate-200"
        } font-semibold`}
        onClick={() => navigate("/groups/MUN")}
      >
        MUN
      </div>
      <div
        onClick={() => navigate("/groups/EPL")}
        className={`cursor-pointer hover:bg-gray-200 rounded-md px-2 py-1 ${
          id === "EPL" && "bg-slate-200"
        } font-semibold`}
      >
        EPL
      </div>
      <div
        onClick={() => navigate("/groups/TOT")}
        className={`cursor-pointer hover:bg-gray-200 rounded-md px-2 py-1 ${
          id === "TOT" && "bg-slate-200"
        } font-semibold`}
      >
        TOT
      </div>
      <Button
        className="cursor-pointer hover:bg-gray-200 rounded-md px-2 py-1 flex justify-between font-[500] text-gray-500 normal-case w-full"
        onClick={handleClickOpen}
      >
        <span>Create group</span>
        <span>+</span>
      </Button>
      <ModalCreateGroup handleClose={handleClose} open={open} />
    </div>
  );
}

export default RecentGroup;
