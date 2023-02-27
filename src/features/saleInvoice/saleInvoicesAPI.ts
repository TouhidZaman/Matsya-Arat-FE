import apiSlice from "../api/apiSlice";

const saleInvoicesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewSale: builder.mutation({
      query: (newSale) => ({
        url: "sales",
        method: "POST",
        body: newSale,
      }),
      invalidatesTags: ["sales", "buyers"],
    }),
    getSales: builder.query({
      query: () => `sales`,
      providesTags: ["sales"],
    }),
    getSalesBySellerId: builder.query({
      query: (sellerId) => `/sales/seller/${sellerId}`,
      providesTags: ["salesBySellerId"],
    }),
  }),
});

export const {
  useCreateNewSaleMutation,
  useGetSalesQuery,
  useGetSalesBySellerIdQuery,
} = saleInvoicesAPI;
