/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginSuccess } from "../redux/authSlice";
import { getCurrentUser } from "../utils/constants";

export default function useUploadImage() {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const user = getCurrentUser();
  useEffect(() => {
    setImage(user?.user?.avatar_url);
  }, []);
  const dispatch = useDispatch();
  const handleChangeImage = files => {
    const formData = new FormData();
    formData.append("file", files);
    const config = {
      // onUploadProgress: e => {
      //   const { loaded, total } = e;
      //   setProgress(Math.floor((loaded / total) * 100));
      // },
      headers: { Authorization: `Bearer ${user?.accessToken}` },
    };

    axios
      .post(`${process.env.REACT_APP_BE_ADDRESS}/user/avatar`, formData, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then(response => {
        setImage(response.data.image_url);
        const newData = { ...user, user: response.data.user };
        dispatch(loginSuccess(newData));
        toast.success("Updated successfully");
      });
  };
  const handleDeleteImage = () => {};
  return {
    image,
    setImage,
    progress,
    handleChangeImage,
    handleDeleteImage,
  };
}
