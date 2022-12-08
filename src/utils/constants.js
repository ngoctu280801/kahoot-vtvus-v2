import { useSelector } from "react-redux";

/* eslint-disable import/prefer-default-export */
export const LIMIT_NAME = 20;
export const OWNED = "owned";
export const JOINED = "joined";
export const PENDING = "pending";

export const getCurrentUser = () => useSelector(state => state.auth.login.currentUser);

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
