import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { NEW_URL } from "../../utils/constants";
// import categories from './categories.json';

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${NEW_URL}/category`);
      
      // GET запрос с получением массива категорий
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default categoriesSlice.reducer;
