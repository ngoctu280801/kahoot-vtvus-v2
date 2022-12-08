/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import ButtonMain from "../../components/button/ButtonMain";
import CircularAvatar from "../../components/user/CircularAvatar";
import User from "../../components/user/User";
import { getGroupById, getUserById, responseInvite } from "../../redux/apiRequest";
import { getCurrentUser } from "../../utils/constants";

function Invitaion() {
  const { id, userId } = useParams();
  const [member, setMember] = useState({});
  const [group, setGroup] = useState({});
  const user = getCurrentUser();
  useEffect(() => {
    getUserById(userId, user?.access_token).then(res => setMember(res));
  }, []);
  useEffect(() => {
    getGroupById(id, user.access_token).then(res => setGroup(res));
  }, []);
  const navigate = useNavigate();

  return (
    <div className="items-center justify-center py-[200px] h-full ">
      <div className="flex justify-between w-[150px] m-auto img-user-invite">
        <User className="bg-green-600" avatar_url={member?.user?.avatar_url} />

        <User className="bg-green-600" avatar_url={user?.user?.avatar_url} />
      </div>
      <div className="flex justify-center m-auto w-[400px] mt-4">
        <h3 className="font-bold ">
          <span className="text-blue-400">{user?.user?.name}</span> invited you to{" "}
          <span className="text-blue-400">{group?.group_name}</span>
        </h3>
      </div>
      <div className="flex justify-center m-auto w-[400px] mt-7">
        <ButtonMain
          bgColor="bg-green-700"
          hoverColor="bg-green-800"
          className="mr-4"
          onClick={() => responseInvite(id, user.access_token, navigate)}
        >
          Accept invitation
        </ButtonMain>
        <ButtonMain textColor="text-black" bgColor="bg-gray-50" hoverColor="bg-gray-300">
          Decline
        </ButtonMain>
      </div>
    </div>
  );
}

export default Invitaion;
