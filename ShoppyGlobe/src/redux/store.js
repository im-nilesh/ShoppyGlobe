import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
// Configure Redux store with cart and search reducers
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});
