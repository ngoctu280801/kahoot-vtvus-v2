/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FormHideShowInput from "../../components/form_components/FormHideShowInput";
import FormInputTextField from "../../components/form_components/FormInputTextField";

import { loginUser } from "../../redux/apiRequest";
import { resetLogin } from "../../redux/authSlice";

function Login() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [cookiesAccess, setCookieAccess] = useCookies(["accessToken"]);
  const [cookiesRefresh, setCookieRefresh] = useCookies(["refreshToken"]);
  // console.log("accessToken", cookiesAccess);
  // console.log("refreshToken", cookiesRefresh);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const onSubmit = async account => {
    // TO DO
    loginUser(account, dispatch, navigate, setCookieAccess, setCookieRefresh);
  };
  const errorMessage = useSelector(state => state.auth.login.errorMsg);
  const isFetching = useSelector(state => state.auth.login.isFetching);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  function handleClick() {
    navigate("/signup");
  }
  useEffect(() => {
    document.title = "Log In";
    return () => {
      dispatch(resetLogin());
    };
  }, []);
  return (
    <div className="w-[420px] mx-auto mt-10">
      <Grid>
        <Paper className="w-[420px] bg-white py-7 px-5 mx-auto">
          <h2 className="text-center mb-5 text-xl font-bold">Log in</h2>
          <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <FormInputTextField
              name="email"
              fullWidth
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              control={control}
            ></FormInputTextField>
            <FormHideShowInput
              id="outlined-adornment-password"
              name="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              label="Password"
              endIcon
              onIconClick={handleClickShowPassword}
              onIconMouseDown={handleMouseDownPassword}
              control={control}
              icon={values.showPassword ? <VisibilityOff /> : <Visibility />}
            ></FormHideShowInput>

            {errorMessage && (
              <div className="bg-red-100 rounded-sm px-4 py-2 text-red-600">
                <h3>{errorMessage}</h3>
              </div>
            )}
            <Button
              type="submit"
              variant="contained"
              className="bg-green-600 text-white hover:bg-green-700 py-3 text-lg h-[52px]"
              disabled={isFetching}
            >
              {isFetching ? <CircularProgress /> : "Log in"}
            </Button>
          </form>
          <div className="w-full float-left border-t-[1px] mt-10 text-center ">
            <b className="w-10 h-10 text-sm text-center bg-white inline-block  rounded-full leading-10 relative -top-5">
              or
            </b>
          </div>
          <a href={`${process.env.REACT_APP_BE_ADDRESS}/auth/google`}>
            <Button variant="outlined" className="w-full relative py-2">
              <img src="/google.svg" alt="" className="absolute left-1" />
              Continue with Google
            </Button>
          </a>

          <div className="text-center mt-4">
            Dont have an account?{" "}
            <span
              role="button"
              tabIndex={0}
              onKeyDown={handleClick}
              className="cursor-pointer text-blue-500 hover:text-blue-600 underline decoration-1"
              onClick={handleClick}
            >
              Sign up
            </span>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}

export default Login;
