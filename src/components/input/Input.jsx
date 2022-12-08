/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { LIMIT_NAME } from "../../utils/constants";

const InputStyles = styled.div`
  position: relative;
  width: 400px;
  transition: all;
  input {
    width: 100%;
    padding: 10px;
    background-color: ${props => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2 linear;
    border: 1px solid transparent;
  }
  input:focus {
    background-color: #fff;
    border: 1px solid ${props => props.theme.primary};
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
`;

const Input = ({
  name = "",
  label = "",
  labelClassName = "",
  type = "text",
  limit = LIMIT_NAME,
  setText = () => {},
  onChange = () => {},
  placeholder = "",
  ...props
}) => {
  const [countdown, setCountdown] = useState(limit);
  const handleChange = e => {
    const { length } = e.target.value;
    if (length < limit) {
      setText(e.target.value);
      onChange(e.target.value);
    }
    setCountdown(limit - length);
  };

  return (
    <InputStyles>
      <label className={`font-semibold text-gray-800 ${labelClassName}`} htmlFor={name}>
        {label}
      </label>
      <input
        className="!border !border-gray-200 outline-blue-400 !pr-12"
        id={name}
        type={type}
        placeholder={placeholder}
        {...props}
        onChange={handleChange}
      />
      <div className="absolute right-5 top-9">{countdown}</div>
      {/* {children} */}
      {/* {type === "text" && (
        <div className={`${filter.length <= 2 ? "" : "hidden"} text-red-500 text-sm`}>
          Group name must be at least 3 characters
        </div>
      )} */}
    </InputStyles>
  );
};
Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.any,
  limit: PropTypes.number,
  onChange: PropTypes.func,
  setText: PropTypes.func,
  placeholder: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default Input;
