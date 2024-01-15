import { createContext } from "react";

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
};
export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
