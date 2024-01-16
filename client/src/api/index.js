import { LOCALSTORAGE_TOKEN, API_URLS } from "../utils";

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN);
  const headers = {
    "content-type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (data.success) {
      return { data: data.data, success: true };
    }
    throw new Error(data.message);
  } catch (error) {
    return {
      message: error.message,
      success: false,
    };
  }
};
export const login = (username, password) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { username, password },
  });
};

export const userRegister = async (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: "POST",
    body: { name, email, password, confirm_password: confirmPassword },
  });
};
export const adminRegister = async (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.adminSignup(), {
    method: "POST",
    body: { name, email, password, confirm_password: confirmPassword },
  });
};
