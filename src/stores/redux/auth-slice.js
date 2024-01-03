import { AUTH_TOKEN, USER_DATA } from "@/constants/const-variables";
import { createSlice } from "@reduxjs/toolkit";

import secureLocalStorage from "react-secure-storage";

const initialState = {
  auth: {
    // @ts-ignore
    isAuthenticated: !!JSON.parse(secureLocalStorage.getItem(AUTH_TOKEN)),
    // @ts-ignore
    token: JSON.parse(secureLocalStorage.getItem(AUTH_TOKEN)),
    // @ts-ignore
    userData: JSON.parse(secureLocalStorage.getItem(USER_DATA))
      ? // @ts-ignore
        JSON.parse(secureLocalStorage.getItem(USER_DATA))
      : null,
  },
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      // store token in local storage
      secureLocalStorage.setItem(
        AUTH_TOKEN,
        JSON.stringify(action.payload.token)
      );
      // store user details in local storage if exist
      action.payload.user
        ? secureLocalStorage.setItem(
            USER_DATA,
            JSON.stringify(action.payload.user)
          )
        : null;
      // update state of isAuthenticated
      state.auth.isAuthenticated = true;

      // update state of userData
      state.auth.userData = action.payload.user;
      // update state of token
      state.auth.token = action.payload.token;
    },

    logout: (state) => {
      state.auth.isAuthenticated = false;

      state.auth.userData = null;
      state.auth.token = null;

      secureLocalStorage.removeItem(AUTH_TOKEN);
      secureLocalStorage.removeItem(USER_DATA);
    },

    setUserData: (state, action) => {
      state.auth.userData = action.payload;
    },
  },
});

export const { login, logout, setUserData } = authSlice.actions;

export default authSlice.reducer;
