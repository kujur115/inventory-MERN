import { useContext, useEffect, useState } from "react";
import jwt from "jwt-decode";
import { AuthContext } from "../providers/AuthProvider";
import {
  LOCALSTORAGE_TOKEN,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils";
import { login as userLogin } from "../api";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthProvider = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN);
      if (userToken) {
        const user = jwt(userToken);
        setUsername(user.username);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const login = async (username, password) => {
    const response = await userLogin(username, password);
    if (response.success) {
      setUsername(response.data.username);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const logout = () => {
    setUsername(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN);
  };

  return {
    username: username,
    login: login,
    logout: logout,
    loading: loading,
  };
};
