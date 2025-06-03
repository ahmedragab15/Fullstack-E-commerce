import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import globalSlice from "./features/globalSlice";
import cartSlice from "./features/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsApiSlice } from "./services/productsApiSlice";

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
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(productsApiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
