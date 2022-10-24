import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    cart: cartSlice,
  },
});

export default store;
