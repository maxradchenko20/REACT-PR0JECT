import {createContext} from "react";


export const initialContext = {
  isLoggedIn: false,
  setIsLoggedIn: Function,
  userName: "",
  setUserName: Function,
  products: [],
  setProducts: Function,
  searchValue: " ",
  setSearchValue: Function,
  openModal: false,
  setOpenModal: Function,
};

export type AppContextType = {
  isLoggedIn: any;
  setIsLoggedIn: <U>(U: any) => void
  userName: any;
  setUserName: <T>(T: string) => any;
  products: any,
  setProducts: <T>(T: any) => any
  searchValue: string,
  setSearchValue: <T>(T: any) => any
  openModal: any,
  setOpenModal: <T>(T: any) => any
}

export const SimpleCtx = createContext<AppContextType>(initialContext);

export const getItLocalStorage = (key: string): any => localStorage.getItem(key)





