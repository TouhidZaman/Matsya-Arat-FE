// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_baseURL,
  }),

  tagTypes: [
    "customers",
    "sales",
    "buyers",
    "sellers",
    "salesBySellerId",
    "customer",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
