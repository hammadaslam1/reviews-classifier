import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
};

const CategoryReducer = createSlice({
  name: "category",
  initialState,
  reducers: {
    toggleCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { toggleCategory } = CategoryReducer.actions;

export default CategoryReducer.reducer;