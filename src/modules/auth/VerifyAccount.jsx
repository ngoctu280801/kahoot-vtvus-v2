/* eslint-disable react/self-closing-comp */
/* eslint-disable react/function-component-definition */
import React from "react";
import { useSelector } from "react-redux";
import ButtonMain from "../../components/button/ButtonMain";

const VerifyAccount = () => {
  const email = useSelector(state => state.auth.register.email);
  console.log(email);
  return (
    <div className="w-[720px] mx-auto mt-10">
      <div className="bg-white rounded-sm py-4 px-6 flex flex-col items-center gap-5 shadow-md">
        <div className="flex flex-col mx-auto items-center">
          <h1 className="font-bold text-3xl mb-4 flex">
            Thank you for signing up on <img className="w-[96px] ml-4" src="/logo.svg" alt="" />
          </h1>
          <h2 className="font-bold text-xl mb-2">Verify your email address now</h2>
          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-500 ">
              You are just one step away from activating your account on the Kahoot! Click on the button bellow and
              start enjoying your accoount
            </p>
            <p className="text-sm text-gray-500">
              Your email address: <span className="font-bold text-black">{email}</span>
            </p>
          </div>
        </div>
        <ButtonMain bgColor="bg-green-500" hoverColor="bg-green-700">
          <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
            Verify my email
          </a>
        </ButtonMain>
      </div>
    </div>
  );
};

export default VerifyAccount;
