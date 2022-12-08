import React from "react";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function SlideMenuSettingHeader() {
  return (
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-md font-semibold mb-2">Slide type</h3>
      <div className="text-gray-500 border boreder-gray-200 p-2 rounded-sm flex justify-between">
        <div className="">
          <EqualizerIcon /> Multiple Choice
        </div>
        <KeyboardArrowDownIcon />
      </div>
    </div>
  );
}

export default SlideMenuSettingHeader;
