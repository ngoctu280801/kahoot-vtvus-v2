/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import React from "react";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import FormHideShowInput from "../../components/form_components/FormHideShowInput";
import ButtonMain from "../../components/button/ButtonMain";
import { getCurrentUser } from "../../utils/constants";
import ModalFetching from "../../components/modal/ModalFetching";

const changePassword = async (oldPassword, newPassword, accessToken, reset) => {
  try {
    const data = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    const res = await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/auth/change-password`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    reset({
      password: "",
      newPassword: "",
      confirmPassword: "",
    });
    toast.success("Update password successfully");
    return res;
  } catch (error) {
    toast.error(error.response.data.error);
  }
  return null;
};

const minLength = 8;
const maxLength = 50;
const schema = yup.object({
  password: yup
    .string()
    .min(minLength, `password must be at least ${minLength} characters`)
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, one uppercase, one lowercase, one number"
    ),
  newPassword: yup
    .string()
    .min(minLength, `password must be at least ${minLength} characters`)
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, one uppercase, one lowercase, one number"
    ),
  confirmPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
function ChangePassword() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const user = getCurrentUser();
  const [isFetching, setIsFetching] = React.useState(false);
  const [values, setValues] = React.useState({
    showPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });
  const onSubmit = async formValues => {
    // TO DO
    setIsFetching(true);
    const res = await changePassword(formValues.password, formValues.newPassword, user.access_token, reset);
    setIsFetching(false);
  };

  const handleClickShowPassword = type => {
    switch (type) {
      case "password":
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
        break;
      case "confirmPassword":
        setValues({
          ...values,
          showConfirmPassword: !values.showConfirmPassword,
        });
        break;
      case "newPassword":
        setValues({
          ...values,
          showNewPassword: !values.showNewPassword,
        });
        break;

      default:
        break;
    }
  };
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <div className=" rounded-md w-2/4 bg-white shadow-[rgb(0_0_0_/_15%)_0px_2px_4px_0px] mx-auto">
      <div className="px-5 py-4 flex justify-between border-gray-200 border-b-[1.5px] leading-8">
        <h2 className="font-bold text-lg block">Change password</h2>
      </div>
      <div className="p-5 flex gap-4 mt-4 ">
        <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormHideShowInput
            id="password"
            name="password"
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange("password")}
            label="Old Password"
            endIcon
            onIconClick={() => handleClickShowPassword("password")}
            onIconMouseDown={handleMouseDownPassword}
            control={control}
            icon={values.showPassword ? <VisibilityOff /> : <Visibility />}
            error={errors?.password != null}
            helperText={errors?.password && errors.password.message}
          ></FormHideShowInput>
          <div className="flex gap-4">
            <FormHideShowInput
              id="new-password"
              name="newPassword"
              type={values.showNewPassword ? "text" : "password"}
              onChange={handleChange("newPassword")}
              label="New Password"
              endIcon
              onIconClick={() => handleClickShowPassword("newPassword")}
              onIconMouseDown={handleMouseDownPassword}
              control={control}
              error={errors?.newPassword != null}
              helperText={errors?.newPassword && errors.newPassword.message}
              icon={values.showNewPassword ? <VisibilityOff /> : <Visibility />}
            ></FormHideShowInput>
            <FormHideShowInput
              id="confirm-password"
              name="confirmPassword"
              type={values.showConfirmPassword ? "text" : "password"}
              onChange={handleChange("confirmPassword")}
              label="Confirm Password"
              endIcon
              onIconClick={() => handleClickShowPassword("confirmPassword")}
              onIconMouseDown={handleMouseDownPassword}
              control={control}
              error={errors?.confirmPassword != null}
              helperText={errors?.confirmPassword && errors.confirmPassword.message}
              icon={values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            ></FormHideShowInput>
          </div>

          <ButtonMain
            type="submit"
            bgColor="bg-green-700"
            hoverColor="bg-green-800"
            className=" w-30 mx-auto mt-4 w-[96px]"
          >
            Save
          </ButtonMain>
          <ModalFetching isFetching={isFetching} />
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
