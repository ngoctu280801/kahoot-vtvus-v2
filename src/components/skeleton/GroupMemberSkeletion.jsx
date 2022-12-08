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

function GroupMemberSkeleton() {
  return (
    <tr>
      <td>
        <div className="flex gap-4 items-center">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={100} height={20} />
          <Skeleton variant="rectangular" width={80} height={15} />
        </div>
      </td>
      <td>
        <Skeleton variant="rectangular" width={100} height={30} />
      </td>
      <td>
        <div className="flex gap-4 items-center">
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="rectangular" width={10} height={30} />
        </div>
      </td>
    </tr>
  );
}

export default GroupMemberSkeleton;
