/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { FormControlLabel, useRadioGroup } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { blue } from "@mui/material/colors";
import PropTypes from "prop-types";

const StyledFormControlLabel = styled(props => <FormControlLabel {...props} />)(({ checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: blue,
  },
}));

function RadioItem(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return (
    <StyledFormControlLabel
      className="border border-gray-200 rounded-md font-bold p-2 m-0"
      checked={checked}
      {...props}
    />
  );
}

RadioItem.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};
export default RadioItem;
