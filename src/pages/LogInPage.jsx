import React from "react";
import LayoutAuth from "../components/layout/LayoutAuth";
import Login from "../modules/auth/Login";

function LogInPage() {
  return (
    <LayoutAuth>
      <Login />
    </LayoutAuth>
  );
}

export default LogInPage;
