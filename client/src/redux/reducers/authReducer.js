import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.user = action.payload;
    },
    logoutReducer: (state) => {
      state.user = null;
    },
  },
});

export const { loginReducer, logoutReducer } = authSlice.actions;

export default authSlice.reducer;
