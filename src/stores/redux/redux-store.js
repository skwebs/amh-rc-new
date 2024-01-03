import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

const reduxStore = configureStore({
  reducer: authReducer,
});

export default reduxStore;
