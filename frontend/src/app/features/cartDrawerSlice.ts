import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IProps {
  isOpen: boolean;
}

const initialState: IProps = {
  isOpen: false,
};

const cartDrawerSlice = createSlice({
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
export default cartDrawerSlice.reducer;
export const { openDrawer, closeDrawer, toggleDrawer } = cartDrawerSlice.actions;
export const selectCartDrawer = (state: RootState) => state.cartDrawer;
