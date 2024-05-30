import { COLORS, MENU_ITEMS } from "@/constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  [MENU_ITEMS.PENCIL]: {
    color: COLORS.BLACK,
    size: 3,
  },
  [MENU_ITEMS.ERASER]: {
    color: COLORS.WHITE,
    size: 3,
  },
  [MENU_ITEMS.UNDO]: {},
  [MENU_ITEMS.REDO]: {},
  [MENU_ITEMS.DOWNLOAD]: {},
};

export const settingSlice = createSlice({
  name: "toolkit",
  initialState,
  reducers: {
    selectActiveColor: (state, action) => {
      state[action.payload.menu].color = action.payload.color;
    },
    selectBrushSize: (state, action) => {
      state[action.payload.menu].size = action.payload.size;
    },
  },
});

export const {selectActiveColor, selectBrushSize } = settingSlice.actions;

export default settingSlice.reducer;
