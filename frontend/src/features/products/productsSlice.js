import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL, NEW_URL } from "../../utils/constants";
import { shuffle } from "../../utils/common";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const prodRes = await axios(`${NEW_URL}/article`);

      for (let i = 0; i < prodRes.data.length; i++) {
        const artImgRes = await axios(`${NEW_URL}/article-image/links/${prodRes.data[i].id}`);
        let images = new Array;
        for (let j = 0; j < artImgRes.data.length; j++)
           images[j] = artImgRes.data[j].link;
           prodRes.data[i].images = images;

        const catRes = await axios(`${NEW_URL}/category/${prodRes.data[i].category_id}`);

        prodRes.data[i].category = catRes.data;
      }
      console.log(prodRes.data);
      return prodRes.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload);
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.list.filter(({ category: { id } }) => id === payload);
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;
