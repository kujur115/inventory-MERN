import { toast } from "react-toastify";
import axios from "axios";

export const BackendUrl = process.env.BACKEND_URL;
// validate email
export const validateEmail = (email) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
// Login User
export const loginUser = async (userData) => {
  try {
    const loginUrl = `${BackendUrl}/users/login`;
    const response = await axios.post(loginUrl, userData);
    if (!response.statusText === "OK")
      toast.success("User logged in successfully");
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    toast.error(message);
  }
};

// Register User
export const registerUser = async (userData) => {
  try {
    const registrationUrl = `${BackendUrl}/users/register`;
    const res = await axios.post(registrationUrl, userData, {
      withCredentials: true,
    });
    if (res.statusText === "OK") toast.success("User Registered Successfully!");
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(error);
    toast.error(message);
  }
};

// Get Login Status
export const getLoginStatus = async () => {
  try {
    const url = `${BackendUrl}/user/loggedin`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(error);
    toast.error(message);
  }
};
