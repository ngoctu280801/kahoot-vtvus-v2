import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import LayoutMain from "../components/layout/LayoutMain";
import UserManage from "../modules/user/UserManage";
import { getCurrentUser } from "../utils/constants";

function UserPage() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);
  return (
    <LayoutMain>
      <UserManage />
    </LayoutMain>
  );
}

export default UserPage;
