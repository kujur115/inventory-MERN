import { createContext } from "react";
import { useAuthProvider } from "../hooks";

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  adminSignup: () => {},
  loading: true,
};
export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
