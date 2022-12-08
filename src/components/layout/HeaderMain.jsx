/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-fragments */
import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import useToggleModal from "../../hooks/useToggleModal";
import ButtonMain from "../button/ButtonMain";
import Bell from "../icon/Bell";
import DropdownMenu from "../dropdown/DropdownMenu";
import MenuBar from "../menu/MenuBar";
import User from "../user/User";
import { logoutSuccess } from "../../redux/authSlice";
import { logoutUser } from "../../redux/apiRequest";

function HeaderMain() {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const { open, handleClickOpen, handleClose } = useToggleModal();
  const optionUserMenu = [
    {
      icon: <AccountCircleIcon />,
      title: "Setting profile",
      onClick: () => {
        navigate("/user/profile");
      },
    },
    {
      icon: <LogoutIcon />,
      title: "Log out",
      onClick: () => {
        logoutUser(dispatch);
        navigate(`/login`);
      },
      className: "text-red-500",
    },
  ];
  return (
    <div className="flex items-center justify-between  px-4 py-3 fixed w-full z-50 bg-white shadow-[rgb(0_0_0_/_10%)_0px_2px_4px_0px]">
      <div className=" flex items-center gap-4">
        <div
          className="w-[96px] mr-4 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="/logo.svg" alt="" />
        </div>
        <MenuBar />
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Button variant="contained" className="bg-blue-700 normal-case px-6">
              Create
            </Button>

            <DropdownMenu data={optionUserMenu}>
              <User avatar_url={user?.user?.avatar_url} className="bg-green-600" />
            </DropdownMenu>

            <Bell />
          </>
        ) : (
          <>
            <Link to="/signup">
              <ButtonMain bgColor="bg-green-700" textColor="text-white" hoverColor="bg-green-800">
                Sign up
              </ButtonMain>
            </Link>
            <Link to="/login">
              <ButtonMain textColor="text-gray-800" bgColor="bg-white" hoverColor="bg-gray-100">
                Log in
              </ButtonMain>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderMain;
