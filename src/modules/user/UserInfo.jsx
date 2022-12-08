/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ButtonMain from "../../components/button/ButtonMain";
import FormInputTextField from "../../components/form_components/FormInputTextField";
import ImageUpload from "../../components/image/UploadImage";
import useUploadImage from "../../hooks/useUploadImage";
import { getCurrentUser } from "../../utils/constants";
import { updateCurrentUser } from "../../redux/authSlice";
import useToggleModal from "../../hooks/useToggleModal";
import ModalFetching from "../../components/modal/ModalFetching";

const updateUserInfo = async (username, accessToken) => {
  try {
    const data = {
      name: username,
    };
    const res = await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/user/profile`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data.user;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const schema = yup.object({
  name: yup.string().min(6, "Username must be at least 6 characters"),
  email: yup.string().required("Please enter your email").email("Please enter valid email address"),
});
function UserInfo() {
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const user = getCurrentUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // username: "ngoctu280801",
      name: user?.user?.name,
      email: user?.user?.email,
    },
    resolver: yupResolver(schema),
  });
  const handleUpdateUserInfo = async name => {
    const res = await updateUserInfo(name, user.access_token);
    const newUser = { ...user };
    newUser.user = res;
    // newUser.user = res;
    dispatch(updateCurrentUser(newUser));
  };
  const onSubmit = formValues => {
    const oldValues = {
      name: user?.user?.name,
      email: user?.user?.email,
    };
    // handle old values
    if (JSON.stringify(formValues) === JSON.stringify(oldValues)) {
      return;
    }
    setIsFetching(true);
    handleUpdateUserInfo(formValues.name).then(res => {
      setIsFetching(false);
      toast.success("Update user information successfully");
    });
  };

  const { image, setImage, progress, handleChangeImage, handleDeleteImage } = useUploadImage();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md w-2/4 bg-white shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px] mx-auto"
    >
      <div className="px-5 py-4 flex justify-between border-gray-200 border-b-[1.5px]">
        <h2 className="font-bold text-lg">User information</h2>
        <ButtonMain type="submit" hoverColor="bg-green-800" bgColor="bg-green-700" className=" h-8 w-[96px]">
          Save
        </ButtonMain>
      </div>
      <div className="p-5 flex gap-4 mt-4">
        <div className="w-[185px] h-[185px] mx-auto rounded-full">
          <ImageUpload
            name="image"
            handleChangeImage={handleChangeImage}
            progress={progress}
            image={image}
            className="!rounded-full h-full"
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          {/* <FormInputTextField
            name="username"
            fullWidth
            label="Username"
            placeholder="Enter your username"
            type="text"
            control={control}
            error={errors?.username != null}
            helperText={errors?.username && errors.username.message}
          /> */}
          <FormInputTextField
            name="name"
            fullWidth
            placeholder="Enter your fullname"
            type="text"
            label="Name"
            control={control}
            error={errors?.name != null}
            helperText={errors?.name && errors.name.message}
          />
          <FormInputTextField
            disabled
            name="email"
            fullWidth
            placeholder="Enter your email address"
            type="email"
            label="Email address"
            control={control}
            error={errors?.email != null}
            helperText={errors?.email && errors.email.message}
          />
        </div>
      </div>
      <ModalFetching isFetching={isFetching} />
    </form>
  );
}

export default UserInfo;
