/* eslint-disable no-unused-vars */
import { debounce } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Search from "../../components/input/Search";
import LeftOptionGroup from "../../components/layout/LeftOptionGroup";
import { getCurrentUser, JOINED, OWNED } from "../../utils/constants";
import GroupList from "./GroupList";

const getGroupsCreatedByUser = async accessToken => {
  const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/group`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

const getGroupsUserHasJoined = async accessToken => {
  const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/group/joined`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};
const createGroup = async (groupName, accessToken) => {
  const data = {
    group_name: groupName,
  };
  const res = await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/group`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  // dispatch(createGroupSuccess());
  return res.data;
};

const handleCreate = async (setGroupList, groupName, accessToken) => {
  await createGroup(groupName, accessToken);
  const getGroupRes = await getGroupsCreatedByUser(accessToken);
  setGroupList(getGroupRes);
};

function DashboardGroup() {
  const [filter, setFilter] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const user = getCurrentUser();
  const handleSetFilter = debounce(e => setFilter(e.target.value), 500);
  const { id } = useParams();
  useEffect(() => {
    setIsFetching(true);
    if (id === OWNED) {
      getGroupsCreatedByUser(user.access_token).then(res => {
        setGroupList(res);
        setIsFetching(false);
      });
    }
    if (id === JOINED) {
      getGroupsUserHasJoined(user.access_token).then(res => {
        setGroupList(res);
        setIsFetching(false);
      });
    }
  }, [id]);

  const handleCreateGroup = text => {
    handleCreate(setGroupList, text, user.access_token);
  };
  return (
    <div className="p-8 px-40 flex-1 bg-gray-50">
      <div className="flex justify-between">
        <Search handleSetFilter={handleSetFilter} />
        <LeftOptionGroup handleCreateGroup={handleCreateGroup} />
      </div>
      <GroupList groupList={groupList} isFetching={isFetching} />
    </div>
  );
}

export default DashboardGroup;
