import type { IProduct } from "@/interface";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Iprops {
  cartItems: [] | IProduct[];
}

const initialState: Iprops = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
  },
});
export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;