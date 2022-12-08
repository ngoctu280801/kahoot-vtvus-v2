import React, { useEffect } from "react";
import LayoutMain from "../components/layout/LayoutMain";
import Invitaion from "../modules/group/Invitaion";

function InvitationPage() {
  useEffect(() => {
    document.title = "Invitation";
  }, []);
  return (
    <LayoutMain bgColor="bg-white" size="12">
      <Invitaion />
    </LayoutMain>
  );
}

export default InvitationPage;
