/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { toast } from "react-toastify";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";

export const registerUser = async (user, dispatch, navigate) => {
  try {
    await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/auth/register`, user);
    dispatch(registerSuccess(user.email));
    toast.success("Sign up successfully");
    navigate("/verifyaccount");
  } catch (err) {
    const errorMessage = err.response.data.error;
    dispatch(registerFailed(errorMessage));
    toast.error(errorMessage, {
      autoClose: false,
    });
  }
};

export const loginGoogleUser = async (url, dispatch, navigate, setCookieAccess, setCookieRefresh) => {
  try {
    const res = await axios.get(url);
    console.log("gg", res.data);
    // toast.success("Login successfully");
    dispatch(loginSuccess(res.data));
    setCookieAccess("accessToken", res.data?.access_token, { path: "/" });
    setCookieRefresh("refreshToken", res.data?.refresh_token, { path: "/" });
    navigate("/");
  } catch (error) {
    const errorMessage = error.response.data.error;
    dispatch(loginFailed(errorMessage));
    // toast.error(errorMessage, { autoClose: false });
  }
};

export const loginUser = async (user, dispatch, navigate, setCookieAccess, setCookieRefresh) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/auth/login`, user);

    // toast.success("Login successfully");
    dispatch(loginSuccess(res.data));
    setCookieAccess("accessToken", res.data?.access_token, { path: "/" });
    setCookieRefresh("refreshToken", res.data?.refresh_token, { path: "/" });
    navigate("/");
  } catch (err) {
    const errorMessage = err.response.data.error;
    dispatch(loginFailed(errorMessage));
    // toast.error(errorMessage, { autoClose: false });
  }
};
export const logoutUser = dispatch => {
  dispatch(logoutSuccess());
};

export const responseInvite = async (id, accessToken, navigate) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BE_ADDRESS}/group/${id}`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    navigate(`/groups/${id}/members`);
  } catch (error) {
    console.log(error);
  }
};

export const getGroupsMembers = async (accessToken, groupIdBody) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/group/member/${groupIdBody}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getGroupById = async (id, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/group/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getUserById = async (id, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_ADDRESS}/user/profile/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const assign = async (user, groupId, role, accessToken, setData) => {
  const data = {
    group_id: groupId,
    user_id: user?.user_id,
    role,
  };
  try {
    await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/group/role`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    getGroupsMembers(accessToken, groupId).then(res => setData(res));

    toast.success("Assigned successfully");
  } catch (err) {
    console.log(err);
    toast.error("Assigned failed");
  }
};

export const deleteUserOnGroup = async (userId, groupId, accessToken, setData) => {
  const data = {
    group_id: groupId,
    user_id: userId,
  };
  try {
    await axios.post(`${process.env.REACT_APP_BE_ADDRESS}/group/kick`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    getGroupsMembers(accessToken, groupId).then(res => setData(res));

    toast.success("Deleted successfully");
  } catch (err) {
    console.log(err);
    toast.error("Deleted failed");
  }
};
export const leaveGroup = async (groupId, accessToken, navigate) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BE_ADDRESS}/group/${groupId}/leave`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    navigate("/groups/owned");

    toast.success("Leave successfully");
  } catch (err) {
    console.log(err);
    toast.error("Leave failed");
  }
};
