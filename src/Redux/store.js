// Redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";
import cartReducer, { syncCartWithFirestore } from "./cartSlice";
import themeReducer from "./ThemeSlice"; // Make sure this is imported correctly
import { persistStore, persistReducer } from "redux-persist";
import categoryReducer from './categorySlice'
const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  }
};

const persistAuthConfig = {
  key: "auth",
  storage,
};

const persistCartConfig = {
  key: "cart",
  storage,
};

const persistThemeConfig = {
  key: "theme",
  storage,
};

const persistedAuth = persistReducer(persistAuthConfig, authReducer);
const persistedCart = persistReducer(persistCartConfig, cartReducer);
const persistedTheme = persistReducer(persistThemeConfig, themeReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    search: searchReducer,
    category : categoryReducer ,
    cart: persistedCart,
    theme: persistedTheme, 
  },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
            serializableCheck: false,
    }).concat(syncCartWithFirestore)
});

export const persistor = persistStore(store);