/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-console */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import FormInputTextField from "../../components/form_components/FormInputTextField";
import FormHideShowInput from "../../components/form_components/FormHideShowInput";
import { registerUser } from "../../redux/apiRequest";
import { resetRegister } from "../../redux/authSlice";

const maxLength = 40;
const minLength = 6;
const schemaValidation = yup.object({
  name: yup
    .string()
    .required("Please enter your name")
    .min(minLength, `Your name must contain from ${minLength}-${maxLength} characters`)
    .max(maxLength, `Your name must contain from ${minLength}-${maxLength} characters`),
  email: yup.string().required("Please enter your email").email("This email is invalid"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      `Must Contain from ${minLength} characters, one uppercase, one lowercase, one number`
    ),
});
function Signup() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schemaValidation) });
  const errorMessage = useSelector(state => state.auth.register.errorMsg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = user => {
    // TO DO
    registerUser(user, dispatch, navigate);
  };
  useEffect(() => {
    document.title = "Sign Up";
    return () => {
      dispatch(resetRegister());
    };
  }, []);
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
  return (
    <div className="w-[420px] mx-auto">
      <h1 className="text-center text-3xl font-bold my-6">Create an account</h1>
      <Grid>
        <Paper className="w-[420px] bg-white py-7 px-5 mx-auto">
          <h2 className="text-center mb-5 text-xl font-bold">Sign up with your email</h2>
          {errorMessage && (
            <div className="bg-red-100 rounded-sm px-4 py-2 text-red-600 mb-4">
              <h3>{errorMessage}</h3>
            </div>
          )}
          <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <FormInputTextField
              name="name"
              label="Name"
              placeholder="Enter your name"
              id="name"
              error={errors?.name != null}
              helperText={errors?.name && errors.name.message}
              control={control}
            ></FormInputTextField>

            <FormInputTextField
              name="email"
              label="Email Address"
              id="email"
              placeholder="Enter your email address"
              type="email"
              error={errors?.email != null}
              helperText={errors?.email && errors.email.message}
              control={control}
            ></FormInputTextField>

            <FormHideShowInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onChange={handleChange("password")}
              error={errors?.password != null}
              helperText={errors?.password && errors.password.message}
              endIcon
              onIconClick={handleClickShowPassword}
              onIconMouseDown={handleMouseDownPassword}
              control={control}
              label="Password"
              icon={values.showPassword ? <VisibilityOff /> : <Visibility />}
            ></FormHideShowInput>

            <Button
              type="submit"
              variant="contained"
              className="bg-green-600 text-white hover:bg-green-700 py-3 text-lg"
            >
              Sign up
            </Button>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="I wish to receive information, offers, recommendations, and updates from Kahoot!"
                classes={{ root: "custom-checkbox-label" }}
              />
            </FormGroup>
          </form>
          <div className="w-full float-left border-t-[1px] mt-4 text-center ">
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
            Already have an account?{" "}
            <span
              role="button"
              tabIndex={0}
              onKeyDown={() => navigate("/login")}
              className="cursor-pointer text-blue-500 hover:text-blue-600 underline decoration-1"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}

export default Signup;
