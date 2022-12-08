import React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate, useParams } from "react-router";
import MenuItem from "./MenuItem";
import { JOINED, OWNED } from "../../utils/constants";

function GroupBar() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="h-screen shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px]">
      <div className="w-full max-w-[224px] bg-white  px-2 py-8 border border-b-2">
        <MenuItem
          onClick={() => navigate(`/groups/${OWNED}`)}
          title="Groups I manage"
          className="p-2 hover:bg-gray-200"
          isActive={id === OWNED}
        >
          <PeopleAltOutlinedIcon />
        </MenuItem>
        <MenuItem
          onClick={() => navigate(`/groups/${JOINED}`)}
          title="Groups I've joined"
          className="p-2 hover:bg-gray-200"
          isActive={id === JOINED}
        >
          <PersonOutlineOutlinedIcon />
        </MenuItem>
      </div>

      {/* <RecentGroup /> */}
    </div>
  );
}

export default GroupBar;
