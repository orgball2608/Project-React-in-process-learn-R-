import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisable: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.isVisable = !state.isVisable;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
