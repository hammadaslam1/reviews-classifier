import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  record: 0,
};

const RecordReducer = createSlice({
  name: "record",
  initialState,
  reducers: {
    toggleRecord: (state, action) => {
      state.record = action.payload;
    },
  },
});

export const { toggleRecord } = RecordReducer.actions;

export default RecordReducer.reducer;
