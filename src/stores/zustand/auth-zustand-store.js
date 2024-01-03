import { createStore } from "zustand";

export const authZustandStore = createStore((set) => ({
  authToken: localStorage.getItem("authToken") || null,

  // isAuthenticated: undefined,
  isAuthenticated: !!localStorage.getItem("authToken"),

  loading: true,

  setLogin: async (/** @type {String} */ token) => {
    localStorage.setItem("authToken", token);

    set({ isAuthenticated: true, authToken: token, loading: false });
  },

  setLogout: () => {
    localStorage.removeItem("authToken");

    set({ isAuthenticated: false, authToken: null, loading: false });
  },

  setLoginStatus: (/** @type {Boolean} */ status) => set({ isLoggedIn: status, isAuthenticated: status }),
}));
