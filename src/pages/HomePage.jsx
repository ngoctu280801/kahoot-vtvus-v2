/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import LayoutMain from "../components/layout/LayoutMain";

function HomePage() {
  useEffect(() => {
    document.title = "Kahoot - Vtvus";
  }, []);
  return <LayoutMain>This is Home page</LayoutMain>;
}

export default HomePage;
