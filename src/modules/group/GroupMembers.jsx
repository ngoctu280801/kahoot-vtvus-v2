/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Button } from "@mui/material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { useNavigate, useParams } from "react-router-dom";
import LayoutMain from "../../components/layout/LayoutMain";
import GroupBar from "../../components/menu/GroupBar";
import Table from "../../components/table/Table";
import Account from "../../components/user/Account";
import LabelStatus from "../../components/label/LabelStatus";
import ActionMember from "../../components/action/ActionMember";
import ModalInvite from "../../components/modal/ModalInvite";
import useToggleModal from "../../hooks/useToggleModal";
import { getGroupsMembers } from "../../redux/apiRequest";
import { getCurrentUser } from "../../utils/constants";
import MemberGroupItem from "./MemberGroupItem";
import GroupMemberSkeleton from "../../components/skeleton/GroupMemberSkeletion";
import BackButton from "../../components/button/BackButton";

function GroupMembers() {
  const [members, setMembers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const { open, handleClickOpen, handleClose } = useToggleModal();
  const { id } = useParams("id");
  const user = getCurrentUser();

  useEffect(() => {
    setIsFetching(true);
    getGroupsMembers(user.access_token, id).then(res => {
      setMembers(res);
      setIsFetching(false);
    });
  }, []);
  useEffect(() => {
    document.title = "Group ";
  }, []);
  return (
    <LayoutMain className="!bg-white">
      <div className="flex ">
        <GroupBar />
        <div className="px-32 py-8 flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <BackButton to="/groups/owned" />
            <div>
              <h1 className="font-bold text-2xl text-gray-800">Group members</h1>
            </div>
          </div>
          <Button
            variant="contained bg-blue-700 normal-case text-white font-semibold hover:bg-blue-800 ml-auto w-fit px-4 py-2 mt-4"
            onClick={handleClickOpen}
          >
            Invite
          </Button>

          <ModalInvite open={open} handleClose={handleClose} idGroup={id} />
          <Table>
            <thead>
              <tr>
                <th className="w-2/4">Name</th>
                <th>Status</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 &&
                !isFetching &&
                members.map(member => <MemberGroupItem setGroupList={setMembers} key={member.user_id} data={member} />)}

              {isFetching && new Array(3).fill(0).map(() => <GroupMemberSkeleton key={uuid()} />)}
            </tbody>
          </Table>
        </div>
      </div>
    </LayoutMain>
  );
}

export default GroupMembers;
