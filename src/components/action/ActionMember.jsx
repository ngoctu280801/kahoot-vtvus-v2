/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useNavigate, useParams } from "react-router";
import DropdownMenu from "../dropdown/DropdownMenu";
import ModalUserInfo from "../modal/ModalUserInfo";
import useToggleModal from "../../hooks/useToggleModal";
import { getCurrentUser } from "../../utils/constants";
import { assign, deleteUserOnGroup, getGroupsMembers, leaveGroup } from "../../redux/apiRequest";
import ModalDelete from "../modal/ModalDelete";

function ActionMember({ data, setData = () => {}, member, isCurrent = false, isPending = false }) {
  const { id } = useParams("id");
  const [members, setMembers] = useState([]);
  const { open, handleClickOpen, handleClose } = useToggleModal();
  const { open: openDelete, handleClickOpen: handleOpenDelete, handleClose: handleCloseDelete } = useToggleModal();
  const { open: openLeave, handleClickOpen: handleOpenLeave, handleClose: handleCloseLeave } = useToggleModal();
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    getGroupsMembers(user.access_token, id).then(res => setMembers(res));
  }, []);

  const isRole = (user, members, role) => {
    for (let i = 0; i < members.length; i++) {
      if (user?.user.user_id === members[i].user_id && members[i].role === role) return true;
    }

    return false;
  };

  const optionGroupManage = [
    {
      icon: <InfoOutlinedIcon />,
      title: "Member info",
      onClick: () => handleClickOpen(),
    },
    {
      icon: <PersonOutlineOutlinedIcon />,
      title: "View profile",
      onClick: () => {},
    },
  ];
  // eslint-disable-next-line prefer-const
  let newOption = [];
  if (data?.role !== "owner" && isCurrent === true) {
    newOption.push({
      icon: <PersonRemoveAlt1OutlinedIcon />,
      title: "Leave",
      onClick: () => {
        handleOpenLeave();
      },
    });
  }
  if (data?.role !== "owner" && data?.user_id !== user?.user.user_id && isRole(user, members, "owner")) {
    newOption.push({
      icon: <AccountCircleIcon />,
      title: "Assign Owner",
      onClick: () => {
        assign(data, id, "owner", user?.access_token, setData);
      },
    });
    if (data?.role !== "co-owner") {
      newOption.push({
        icon: <AccountCircleIcon />,
        title: "Assign Co-owner",
        onClick: () => {
          assign(data, id, "co-owner", user?.access_token, setData);
        },
      });
    }
    newOption.push(
      {
        icon: <AccountCircleIcon />,
        title: "Assign member",
        onClick: () => {
          assign(data, id, "member", user?.access_token, setData);
        },
      },
      {
        icon: <PersonRemoveAlt1OutlinedIcon />,
        title: "Remove",
        onClick: () => {
          handleOpenDelete();
        },
      }
    );
  }

  if (data?.role === "member" && isRole(user, members, "co-owner")) {
    newOption.push(
      // {
      //   icon: <AccountCircleIcon />,
      //   title: "Assign co-owner",
      //   onClick: () => {
      //     assign(data, id, "co-owner", user?.access_token, setData);
      //   },
      // },
      {
        icon: <PersonRemoveAlt1OutlinedIcon />,
        title: "Remove",
        onClick: () => {
          handleOpenDelete();
        },
      }
    );
  }
  const args = { userId: data?.user_id, groupId: id, accessToken: user?.access_token, setData };

  const handleDelete = () => {
    deleteUserOnGroup(args.userId, args.groupId, args.accessToken, args.setData);
  };
  const handleLeave = () => {
    leaveGroup(args.groupId, args.accessToken, navigate);
  };
  const newListBtn = [...optionGroupManage, ...newOption];
  return (
    <div className="flex items-center justify-end">
      {isPending && (
        <Button variant="contained" className="bg-blue-600 normal-case font-semibold">
          Resend
        </Button>
      )}
      <Button onClick={handleClickOpen} className="hover:bg-white">
        <InfoOutlinedIcon className="cursor-pointer" />
      </Button>
      <DropdownMenu data={newOption ? newListBtn : optionGroupManage}>
        <MoreVertOutlinedIcon />
      </DropdownMenu>
      <ModalUserInfo data={data} member={member} open={open} handleClose={handleClose} />
      <ModalDelete open={openDelete} handleClose={handleCloseDelete} handleDelete={handleDelete}>
        Are you sure to delete <b> {member?.user?.name}</b>
      </ModalDelete>
      <ModalDelete open={openLeave} handleClose={handleCloseLeave} handleDelete={handleLeave} isLeave>
        Are you sure to leave the group?
      </ModalDelete>
    </div>
  );
}
ActionMember.propTypes = {
  // eslint-disable-next-line react/require-default-props

  member: PropTypes.object,
  isPending: PropTypes.bool,
  isCurrent: PropTypes.bool,
  setData: PropTypes.func,
};

export default ActionMember;
