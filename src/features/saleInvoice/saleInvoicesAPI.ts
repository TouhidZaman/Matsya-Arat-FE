import apiSlice from "../api/apiSlice";

const saleInvoicesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewSale: builder.mutation({
      query: (newSale) => ({
        url: "sales",
        method: "POST",
        body: newSale,
      }),
      invalidatesTags: ["sales", "customers"],
    }),
    getSales: builder.query({
      query: () => `sales`,
      providesTags: ["sales"],
    }),
  }),
});

export const { useCreateNewSaleMutation } = saleInvoicesAPI;
