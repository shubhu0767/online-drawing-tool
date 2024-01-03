import { MENU_ITEMS } from "@/constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenu: MENU_ITEMS.PENCIL,
  actionMenu: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    selectActiveMenuItem: (state, action) => {
      state.activeMenu = action.payload;
    },
    selectActionMenuItem: (state, action) => {
      state.actionMenu = action.payload;
    },
  },
});

export const { selectActiveMenuItem, selectActionMenuItem } = menuSlice.actions;

export default menuSlice.reducer;
