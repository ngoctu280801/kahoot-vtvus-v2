/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate, useParams } from "react-router";
import BackButton from "../button/BackButton";
import User from "../user/User";
import { getCurrentUser } from "../../utils/constants";
import ButtonMain from "../button/ButtonMain";
import { getSlideById, updateSlide } from "../../handleApi";
import { getUserById } from "../../redux/apiRequest";

function HeaderPresentation() {
  const { idSlide } = useParams();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [owner, setOwner] = useState({});
  const [slide, setSlide] = useState({});
  const [filter, setFilter] = useState({});
  useEffect(() => {
    getSlideById(idSlide, user?.access_token).then(res => setSlide(res));
  }, []);
  useEffect(() => {
    if (slide?.owner) getUserById(slide?.owner, user?.access_token).then(res => setOwner(res));
    setFilter(slide?.title);
  }, [slide]);
  const handleUpdateTitle = () => {
    updateSlide(slide, filter, user?.access_token, setSlide);
  };
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="flex items-center justify-between w-full py-2 px-4 border-b-2 border-gray-200">
      <div className="flex gap-4">
        <BackButton to="/slides" />
        <div>
          {isShown ? (
            <input
              value={filter}
              onChange={e => setFilter(e.target.value)}
              onFocus={() => setIsShown(true)}
              onBlur={() => {
                setIsShown(false);
                handleUpdateTitle();
              }}
              className="p-[9px] w-[400px] border border-gray-200"
            />
          ) : (
            <div
              className="flex flex-col justify-center"
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <h3 className="font-bold ">{slide.title}</h3>
              <div className="text-sm text-gray-600">Created by {owner?.user?.name || "user"}</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center">
          <CheckIcon style={{ color: "green" }} />
          <span className="text-gray-400">Saved</span>
        </div>
        <div className="w-[0.5px] h-10 bg-gray-200 mx-2" />
        <User className="bg-green-600 mr-2" avatar_url={user?.user?.avatar_url} />

        <ButtonMain bgColor="bg-white" textColor="text-gray-800" hoverColor="bg-gray-100">
          <ShareOutlinedIcon className="w-5" />
          <span className="text-lg font-thin"> Share</span>
        </ButtonMain>

        <ButtonMain
          bgColor="bg-blue-600"
          textColor="text-white"
          hoverColor="bg-blue-700"
          onClick={() => {
            navigate(`/slides/host/${idSlide}`);
          }}
        >
          <PlayArrowIcon className="w-5" />
          <span className="text-lg font-thin"> Present</span>
        </ButtonMain>
      </div>
    </div>
  );
}

export default HeaderPresentation;
