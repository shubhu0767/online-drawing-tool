import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menu.slice";

export const store = configureStore({
    reducer: {
        menu:  menuReducer,
    },
})

