/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import LayoutMain from "../components/layout/LayoutMain";
import Group from "../modules/group/Group";
import { getCurrentUser } from "../utils/constants";

function GroupPage() {
  useEffect(() => {
    document.title = "Kahoot - group";
  }, []);
  const navigate = useNavigate();
  const user = getCurrentUser();
  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);
  return (
    <LayoutMain className="!bg-white">
      <Group />
    </LayoutMain>
  );
}

export default GroupPage;
