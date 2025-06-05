import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/registerSlice";
import loginSlice from "./features/loginSlice";
import cartDrawerSlice from "./features/cartDrawerSlice";
import networkSlice from "./features/networkSlice";
import cartSlice from "./features/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsApiSlice } from "./services/productsApiSlice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

const persistCartConfig = {
  key: "cart",
  storage,
};
const persistedCart = persistReducer(persistCartConfig, cartSlice);

const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    cartDrawer: cartDrawerSlice,
    network: networkSlice,
    cart: persistedCart,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(productsApiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
