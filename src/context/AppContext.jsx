import { createContext } from "react";
import { doctors } from "../01_assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const value = {
    doctors,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
