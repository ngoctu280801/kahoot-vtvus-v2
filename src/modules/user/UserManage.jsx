/* eslint-disable react/self-closing-comp */
import React, { useEffect } from "react";
import uuid from "react-uuid";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";
import BasicTabs from "../../components/tab/TabPanel";

function UserManage() {
  useEffect(() => {
    document.title = "User manage";
  }, []);
  const tabList = [
    {
      id: uuid(),
      title: "Information",
      children: <UserInfo></UserInfo>,
    },
    {
      id: uuid(),
      title: "Change Password",
      children: <ChangePassword></ChangePassword>,
    },
  ];
  return (
    <div className="mx-auto w-[1232px] m-10 bg-inherit">
      <h1 className="font-bold text-3xl mb-4">Setting</h1>
      <BasicTabs data={tabList}></BasicTabs>
    </div>
  );
}

export default UserManage;
