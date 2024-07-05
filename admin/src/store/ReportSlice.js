import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailId: {},
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setDetailId: (state, action) => {
      state.detailId = action.payload;
    },
  },
});

export const { setDetailId } = reportSlice.actions;

export default reportSlice.reducer;
