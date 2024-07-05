import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginData: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
  },
});

export const { setLoginData } = loginSlice.actions;

export default loginSlice.reducer;
