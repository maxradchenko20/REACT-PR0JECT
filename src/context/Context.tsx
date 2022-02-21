import {createContext} from "react";

export const initialContext = {
  isLoggedIn: false,
  setIsLoggedIn: Function,
  userName: "",
  setUserName: Function,
  users: [],
  setUsers: Function,
  searchValue: "",
  setSearchValue: Function
};

export type AppContextType = {
  isLoggedIn: any;
  setIsLoggedIn: <U>(U: any) => void
  userName: any;
  setUserName: <T>(T: string) => any;
  users: any,
  setUsers: <T>(T: any) => any,
  searchValue: any,
  setSearchValue: <T>(T: any) => any

}

export const userContext = createContext<AppContextType>(initialContext);

export const getItLocalStorage = (key: string): (string | null) => localStorage.getItem(key);





