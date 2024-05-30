import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { buildUrl } from "../../utils/common";
import { BASE_URL, NEW_URL } from "../../utils/constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: NEW_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/article/${id}`,
      providesTags: ["Product"],
    }),
    getProducts: builder.query({
      query: (params) => buildUrl("/limited-article", params),
      providesTags: ["Products"],
    }),
  }),
});

// export const apiSlice 

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;