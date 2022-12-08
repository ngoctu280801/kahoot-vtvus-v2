/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/self-closing-comp */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";
import ModalMain from "./ModalMain";

const ModalFetching = ({ isFetching, title = "Loading", handleClose = () => {} }) => {
  return (
    <ModalMain open={isFetching} handleClose={handleClose} title={title}>
      <div className="px-4 flex flex-col mx-auto">
        <CircularProgress />
      </div>
    </ModalMain>
  );
};
ModalFetching.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  title: PropTypes.string,
  handleClose: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
};

export default ModalFetching;
