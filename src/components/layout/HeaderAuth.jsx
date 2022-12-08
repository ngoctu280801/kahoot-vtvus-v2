/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HeaderAuth() {
  const navigate = useNavigate();
  return (
    <div className="fixed w-full z-50 bg-white flex items-center justify-between px-4 py-3 shadow-[rgb(0_0_0_/_10%)_0px_2px_4px_0px]">
      <div
        className="w-full max-w-[96px] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/logo.svg" alt="" />
      </div>
      <Link to="/" className="p-[1px]  rounded-full shadow-[rgb(0_0_0_/_10%)_0px_2px_4px_0px]">
        <img src="/browser.svg" alt="" />
      </Link>
    </div>
  );
}

export default HeaderAuth;
