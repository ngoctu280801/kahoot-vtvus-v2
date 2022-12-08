/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import React from "react";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import HorizontalSplitOutlinedIcon from "@mui/icons-material/HorizontalSplitOutlined";
import Icon from "../icon/Icon";
import ModalCreateGroup from "../modal/ModelCreateGroup";
import useToggleModal from "../../hooks/useToggleModal";

function LeftOptionGroup({ handleCreateGroup }) {
  const { open, handleClickOpen, handleClose } = useToggleModal();
  return (
    <div className="flex gap-4">
      <Icon isActive>
        <DnsOutlinedIcon className=" w-10 h-10" />
      </Icon>
      <Icon>
        <HorizontalSplitOutlinedIcon className=" w-10 h-10" />
      </Icon>
      <Button variant="contained" onClick={handleClickOpen} className="bg-blue-700 normal-case px-6 font-bold">
        Create group
      </Button>
      <ModalCreateGroup handleClose={handleClose} open={open} handleAgree={handleCreateGroup} />
    </div>
  );
}

export default LeftOptionGroup;
