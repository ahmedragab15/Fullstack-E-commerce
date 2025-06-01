import type { IProduct } from "@/interface";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { quantityHandler } from "@/utils";

interface IinitialState {
  cartItems: IProduct[];
}

const initialState: IinitialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = quantityHandler(state.cartItems, action.payload);
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = state.cartItems.filter((item) => item.documentId !== action.payload.documentId);
    },
    clearCart:(state)=>{
      state.cartItems = []
    }
  },
});
export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
