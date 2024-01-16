const API_ROOT = "http://localhost:8000/api/";

export const API_URLS = {
  login: () => `${API_ROOT}/user/login`,
  signup: () => `${API_ROOT}/user/signup`,
  adminSignup: () => `${API_ROOT}/user/admin/signup`,
};
export const LOCALSTORAGE_TOKEN = "__InventoryToken__";

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error("Cannot get item from local storage");
  }
  return localStorage.getItem(key);
};

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error("Can not store in Ls");
  }
  const valueToStore =
    typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error("Cannot remove the value from Ls");
  }

  localStorage.removeItem(key);
};
