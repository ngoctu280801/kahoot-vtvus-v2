import React from "react";
import LayoutAuth from "../components/layout/LayoutAuth";
import VerifyAccount from "../modules/auth/VerifyAccount";

function VerifyAccountPage() {
  return (
    <LayoutAuth>
      <VerifyAccount />
    </LayoutAuth>
  );
}

export default VerifyAccountPage;
