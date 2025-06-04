import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IProps {
  isOnline: boolean;
}

const initialState: IProps = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
  networkMode: (state, action) => {
    state.isOnline = action.payload
  }
  },
});
export default networkSlice.reducer;
export const { networkMode } = networkSlice.actions;
export const selectNetwork = (state: RootState) => state.network;
