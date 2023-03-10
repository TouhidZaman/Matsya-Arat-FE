import apiSlice from "../api/apiSlice";

const saleInvoicesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewSale: builder.mutation({
      query: (newSale) => ({
        url: "sales",
        method: "POST",
        body: newSale,
      }),
      invalidatesTags: [
        "sales",
        "buyers",
        "salesBySellerId",
        "salesByBuyerId",
        "customer",
        "salesByDateGroup",
      ],
    }),
    getSales: builder.query({
      query: () => `sales`,
      providesTags: ["sales"],
    }),
    getSalesByDateGroup: builder.query({
      query: (filter) => `sales/date?` + filter,
      providesTags: ["salesByDateGroup"],
    }),
    getSalesBySellerId: builder.query({
      query: (sellerId) => `/sales/seller/${sellerId}`,
      providesTags: ["salesBySellerId"],
    }),
    getSalesByBuyerId: builder.query({
      query: (buyerId) => `/sales/buyer/${buyerId}`,
      providesTags: ["salesByBuyerId"],
    }),
  }),
});

export const {
  useCreateNewSaleMutation,
  useGetSalesQuery,
  useGetSalesBySellerIdQuery,
  useGetSalesByBuyerIdQuery,
  useGetSalesByDateGroupQuery,
} = saleInvoicesAPI;
