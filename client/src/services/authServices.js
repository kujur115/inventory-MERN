import { toast } from "react-toastify";
import axios from "axios";

export const BackendUrl = process.env.BACKEND_URL;
export const validateEmail = (email) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

export const loginUser = async (userData) => {
  try {
    const loginUrl=`${BackendUrl}/users/login`
    const response = await axios.post(loginUrl, userData);
    if (!response.statusText === "OK")
      toast.success("User logged in successfully");
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
