import React from "react";
import LayoutAuth from "../components/layout/LayoutAuth";
import Signup from "../modules/auth/Sinup";

function RegisterPage() {
  return (
    <LayoutAuth>
      <Signup />
    </LayoutAuth>
  );
}

export default RegisterPage;
