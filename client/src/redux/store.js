import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth";
import productReducer from "./features/product";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
