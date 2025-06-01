import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import globalSlice from "./features/globalSlice";
import cartSlice from "./features/cartSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 


const persistCartConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistCartConfig, cartSlice);

const store = configureStore({
  reducer: {
    login: loginSlice,
    global: globalSlice,
    cart: persistedCart,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store)