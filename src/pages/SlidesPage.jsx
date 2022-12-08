import React from "react";
import LayoutMain from "../components/layout/LayoutMain";
import SlideBar from "../components/menu/SlideBar";
import DashboardSlide from "../modules/slide/DashboardSlide";

function SlidesPage() {
  return (
    <LayoutMain className="!bg-white">
      <div className="flex">
        <SlideBar />
        <DashboardSlide />
      </div>
    </LayoutMain>
  );
}

export default SlidesPage;
