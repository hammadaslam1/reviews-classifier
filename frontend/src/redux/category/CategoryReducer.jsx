import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 'appliances',
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