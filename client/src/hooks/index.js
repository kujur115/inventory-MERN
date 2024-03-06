import { useContext, useEffect, useState } from "react";
import { jwtDecode as jwt } from "jwt-decode";
import { AuthContext } from "../providers/AuthProvider";
import {
  LOCALSTORAGE_TOKEN,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils";
import { login as userLogin, userRegister, adminRegister } from "../api";
import { DataContext } from "../providers/DataProvider";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN);
        if (userToken) {
          const user = jwt(userToken);
          setUser(user);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const login = async (username, password) => {
    const response = await userLogin(username, password);
    if (response.success) {
      setUser(response.data.user);
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
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN);
  };
  const signup = async (username, password, confirmPassword, email) => {
    const register = await userRegister(
      username,
      email,
      password,
      confirmPassword
    );
    if (register.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: register.message,
      };
    }
  };
  const adminSignup = async (username, password, confirmPassword, email) => {
    const register = await adminRegister(
      username,
      email,
      password,
      confirmPassword
    );
    if (register.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: register.message,
      };
    }
  };

  return {
    user: user,
    login: login,
    logout: logout,
    loading: loading,
    signup: signup,
    adminSignup,
  };
};

export const useData = () => useContext(DataContext);
export const useDataProvider = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItemsFromServer = () => {
      fetch("http://localhost:8000/products")
        .then((response) => response.json())
        .then((data) => setItems(data))
        .catch((error) => console.error("Error fetching items data:", error));
    };
    getItemsFromServer();
  }, []);
  return { items, setItems };
};
