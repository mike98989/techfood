import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    //value: { data: { name: "john doe", email: "doe@doe.com" }, token: "" },
    value: { data: null, token: "" },
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    clearUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
