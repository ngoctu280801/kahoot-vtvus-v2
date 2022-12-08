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
import { Skeleton } from "@mui/material";
import useToggleModal from "../../hooks/useToggleModal";
import Icon from "../icon/Icon";
import User from "../user/User";

function GroupItemSkeleton() {
  return (
    <div className="group-item flex flex-col gap-2 bg-white h-40 p-4 shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px] rounded-md cursor-pointer">
      <div className="flex justify-between">
        <div>
          <Skeleton variant="circular" width={40} height={40} />
        </div>
        <Skeleton variant="rectangular" width={10} height={30} />
      </div>
      <div className="text-sm group-desc">
        <Skeleton variant="rectangular" width={200} height={40} />
      </div>
      <div className="flex-1 flex items-end font-semibold text-gray-800">
        <Skeleton variant="rectangular" width={200} height={28} />
      </div>
    </div>
  );
}

export default GroupItemSkeleton;
