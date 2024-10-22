import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
  name: "language",
  initialState: {
    value: { language: "" },
  },
  reducers: {
    setLanguage: (state, action) => {
      state.value = action.payload;
    },
    clearLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLanguage, clearLanguage } = languageSlice.actions;
export default languageSlice.reducer;
