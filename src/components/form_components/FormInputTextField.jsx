/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function FormInputTextField({ control, ...props }) {
  //   const control = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      defaultValue=""
      render={({ field }) => <TextField fullWidth {...field} {...props} />}
    />
  );
}

export default FormInputTextField;
