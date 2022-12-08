/* eslint-disable no-unused-vars */
import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { NavLink } from "react-router-dom";
import { Topic } from "@mui/icons-material";
import MenuItem from "./MenuItem";

// eslint-disable-next-line react/function-component-definition
const MenuBar = () => {
  const url = window.location.href;
  let isGroup = false;
  if (url.includes("/groups/")) isGroup = true;
  return (
    <>
      <NavLink to="/" className={({ isActive }) => (isActive ? "!text-purple-700" : "")} end>
        <MenuItem title="Home">
          <HomeOutlinedIcon />
        </MenuItem>
      </NavLink>
      {/* <MenuItem title="Discover">
        <ExploreOutlinedIcon />
      </MenuItem>
      <MenuItem title="Library">
        <ListOutlinedIcon />
      </MenuItem>
      <MenuItem title="Reports">
        <LeaderboardOutlinedIcon />
      </MenuItem> */}
      <NavLink
        to="/groups/owned"
        className={({ isActive }) => (isActive ? "text-purple-700" : `${isGroup ? "!text-purple-700" : ""}`)}
        end
      >
        <MenuItem title="Groups">
          <Diversity1OutlinedIcon />
        </MenuItem>
      </NavLink>
      <NavLink to="/slides" className={({ isActive }) => (isActive ? "!text-purple-700" : "")} end>
        <MenuItem title="Slides">
          <Topic />
        </MenuItem>
      </NavLink>
      {/* <MenuItem title="Marketplace">
        <StorefrontOutlinedIcon />
      </MenuItem> */}
    </>
  );
};

export default MenuBar;
