import { createSlice } from "@reduxjs/toolkit";
// Update search term in Redux store
const searchSlice = createSlice({
  name: "search",
  initialState: "",

  reducers: {
    setSearchTerm(state, action) {
      return action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
