import { createContext } from "react";
import { useDataProvider } from "../hooks";

const initialState = {
  items: [],
  setItems: () => {},
};

export const DataContext = createContext(initialState);

export const DataProvider = ({ children }) => {
  const data = useDataProvider();
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
