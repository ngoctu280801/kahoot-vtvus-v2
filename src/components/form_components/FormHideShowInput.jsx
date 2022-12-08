/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function FormHideShowInput({
  control,
  width = "100%",
  icon,
  onIconClick,
  onIconMouseDown,
  startIcon,
  endIcon,
  error,
  helperText,
  ...props
}) {
  //   const control = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormControl sx={{ width }} variant="outlined">
          <InputLabel htmlFor={props.id} error={error}>
            {props.label}
          </InputLabel>
          <OutlinedInput
            {...props}
            {...field}
            error={error}
            label={props.label}
            startAdornment={
              startIcon && (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onIconClick}
                    onMouseDown={onIconMouseDown}
                    edge="start"
                  >
                    {icon}
                  </IconButton>
                </InputAdornment>
              )
            }
            endAdornment={
              endIcon && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onIconClick}
                    onMouseDown={onIconMouseDown}
                    edge="end"
                  >
                    {icon}
                  </IconButton>
                </InputAdornment>
              )
            }
            // label="Password"
          />
          {helperText && (
            <FormHelperText error={error} id="username-error">
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export default FormHideShowInput;
