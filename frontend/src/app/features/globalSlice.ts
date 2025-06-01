import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface DrawerState {
  isOpen: boolean;
}

const initialState: DrawerState = {
  isOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isOpen = true;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
    },
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});
export default globalSlice.reducer;
export const { openDrawer, closeDrawer, toggleDrawer } = globalSlice.actions;
export const selectGlobal = (state: RootState) => state.global;
