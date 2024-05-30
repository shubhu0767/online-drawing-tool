import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menu.slice";
import settingReducer from "./slices/settingSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    setting: settingReducer,
  },
});
