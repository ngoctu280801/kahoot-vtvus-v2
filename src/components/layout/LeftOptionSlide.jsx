/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import React from "react";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import AddIcon from "@mui/icons-material/Add";
import HorizontalSplitOutlinedIcon from "@mui/icons-material/HorizontalSplitOutlined";
import Icon from "../icon/Icon";
import ModalCreateGroup from "../modal/ModelCreateGroup";
import useToggleModal from "../../hooks/useToggleModal";

function LeftOptionSlide({ handleCreateSlide, isSelectedAll, onDelete }) {
  const { open, handleClickOpen, handleClose } = useToggleModal();
  return (
    <div className="flex gap-4">
      <Icon isActive>
        <DnsOutlinedIcon className=" w-10 h-10" />
      </Icon>
      <Icon>
        <HorizontalSplitOutlinedIcon className=" w-10 h-10" />
      </Icon>
      {isSelectedAll ? (
        <Button
          variant="contained"
          onClick={onDelete}
          className="bg-red-500 normal-case px-6 font-bold hover:bg-red-700"
        >
          <h2>Delete</h2>
        </Button>
      ) : (
        <Button variant="contained" onClick={handleClickOpen} className="bg-blue-700 normal-case px-6 font-bold">
          <h2>
            <span className="mr-2">
              <AddIcon />
            </span>
            Create slide
          </h2>
        </Button>
      )}
      <ModalCreateGroup
        title="Create new slide"
        handleClose={handleClose}
        open={open}
        handleAgree={handleCreateSlide}
      />
    </div>
  );
}

export default LeftOptionSlide;
