/* eslint-disable no-unused-vars */
import React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useNavigate, useParams } from "react-router";
import { Folder, FolderOutlined } from "@mui/icons-material";
import MenuItem from "./MenuItem";

function SlideBar() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="h-screen shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px]">
      <div className="h-full w-[224px] bg-white  px-2 py-8 border border-b-2">
        <MenuItem
          onClick={() => navigate(`/slides`)}
          title="My slides"
          className="p-2 hover:bg-gray-200"
          isActive={id === undefined}
        >
          <FolderOutlined />
        </MenuItem>
      </div>

      {/* <RecentGroup /> */}
    </div>
  );
}

export default SlideBar;
